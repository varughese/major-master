function nextSemester(current) {
	let year = Number(current.substring(1, 3));
	let term = Number(current[3]);
	term += 3;
	if(term === 10) {
		year = year + 1;
		term = 1;
	}
	return "2"+year+""+term;
}

export default function getNextTerms(current) {
	const terms = [current];
	let csem = current;
	while (terms.length < 8) {
		const next = nextSemester(csem);
		csem = next;
		if(Number(csem[3]) !== 7) {
			terms.push(next);
		}
	}
	return terms.reduce((tobj, id) => {
		tobj[id] = { id };
		return tobj;
	} ,{});
}
  