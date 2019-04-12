{
  function classMaker(dept, nums) {
    if(typeof nums == 'string') return dept + nums;

    const clone = {};
    for(const key in nums) {
      clone[key] = nums[key].map(x => classMaker(dept, x));
    }

    return clone;
  }

  // TODO: go over exceptions in out.txt to see what to handle,
  //  disregard as much as possible, and manually edit remainder
}

start
  = (_? 'preq:'i)? _? e:expr _? ([\.,;\n\r] .*)?
  { return e; }

expr
  = a:and _? 'or'i _? e:expr
  {
    const eHasOr = e.hasOwnProperty('or');
    const aHasOr = a.hasOwnProperty('or');
    if(eHasOr) {
      if(aHasOr) {
        e.or.unshift(...a.or);
      } else {
        e.or.unshift(a);
      }
      return e;
    }
    if(aHasOr) {
      a.or.push(e);
      return a;
    }
    return { or: [a, e] };
  }
  / a:and { return a; }

and
  = ts:terms _? 'and'i _? a:and
  {
    if(a.hasOwnProperty('and')) {
      a.and.unshift(ts);
      return a;
    }
    return { and: [ts, a] };
  }
  / terms

terms
  = ds:depts _? ns:nums
  {
    const or = ds.flatMap(d => {
      const subtree = classMaker(d, ns);
      return subtree.hasOwnProperty('or') ? subtree.or : [subtree];
    });
    return or.length == 1 ? or[0] : { or };
  }
  / '{' _? e:expr _? ([,;\n\r] [^}]*)? '}'  { return e; }
  / '[' _? e:expr _? ([,;\n\r] [^\]]*)? ']' { return e; }
  / '(' _? e:expr _? ([,;\n\r] [^)]*)? ')'  { return e; }

depts
  = d:dept (_ 'or'i _ / _? '/' _?) ds:depts { ds.unshift(d); return ds; }
  / d:dept                                  { return [d]; }

dept = d:[a-z]i+  { return d.join('').toUpperCase(); }

nums
  = ng:numgroup _? 'or'i _? ns:nums
  {
    if(ns.hasOwnProperty('or')) {
      ns.or.unshift(ng);
      return ns;
    }
    if(ng.hasOwnProperty('or')) {
      ng.or.push(ns);
      return ng;
    }
    return { or: [ng, ns] };
  }
  / ng:numgroup { return ng; }

numgroup
  = nt:numterm _? 'and'i _? ng:numgroup
  {
    if(ng.hasOwnProperty('and')) {
      ng.and.unshift(nt);
      return ng;
    }
    return { and: [nt, ng] };
  }
  / numterm

numterm
  = num
  / '{' _? ns:nums _? ([,;\n\r] [^}]*)? '}'   { return ns; }
  / '[' _? ns:nums _? ([,;\n\r] [^\]]*)? ']'  { return ns; }
  / '(' _? ns:nums _? ([,;\n\r] [^)]*)? ')'   { return ns; }

num
  = n:[0-9]+ s:suffix?
  { return n.join('').padStart(4, 0) + (s || '').toUpperCase(); }

suffix = [cjp]i / 'is'i / 'os'i

_ = comment / ws

ws = [ \t]+
comment = ws? '(' ws? ('min'i / 'with'i / 'both'i) [^)]* ')' ws?
