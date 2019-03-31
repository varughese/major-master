const terms = {"1": "Fall", "4": "Spring", "7": "Summer"};
// https://www.registrar.pitt.edu/assets/pdf/PS%20Term%20Naming%20Convention.pdf
export default function(termcode) {
	termcode = termcode+"";
	const century = termcode[0];
	const year = termcode.substring(1, 3);
	const term = terms[termcode[3]];
	if(!term || !year) return termcode;
	return `${term.toUpperCase()} ${year}`;
}