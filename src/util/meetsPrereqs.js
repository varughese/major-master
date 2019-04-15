/**
 * Evaluate a prereq tree given set of taken courses.
 *
 * Provides the ability to evaluate whether a student meets the prerequisutes
 * to take a certain class.
 *
 * @param {Set} taken
 *   Set of taken classes
 * @param {object|String} prereqs
 *   Prereq tree for course
 * @return
 *   true if taken courses meets prerequisites
 */
export default function meetsPrereqs(taken, prereqs) {
  if(prereqs == null) return true;

  if(prereqs.hasOwnProperty('or')) {
    return prereqs.or.some(p => meetsPrereqs(taken, p));
  }
  if(prereqs.hasOwnProperty('and')) {
    return prereqs.and.every(p => meetsPrereqs(taken, p));
  }
  if(prereqs.hasOwnProperty('>')) {
    const courseRegex = /^([a-z]+)(\d+)([a-z]*)$/i;
    const [, otherDept, otherNum] = prereqs['>'].match(courseRegex) || [];
    for(const course of taken) {
      const [, dept, num] = course.match(courseRegex) || [];
      if(dept === otherDept && num >= otherNum) return true;
    }
    return false;
  }
  if(prereqs.hasOwnProperty('range')) {
    const courseRegex = /^([a-z]+)(\d+)([a-z]*)$/i;
    const [, otherDept, lowNum] = prereqs.range[0].match(courseRegex) || [];
    const [, , highNum] = prereqs.range[1].match(courseRegex) || [];
    for(const course of taken) {
      const [, dept, num] = course.match(courseRegex) || [];
      if(dept === otherDept && num >= lowNum && num <= highNum) return true;
    }
    return false;
  }

  return taken.has(prereqs);
}
