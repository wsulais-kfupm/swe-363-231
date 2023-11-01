import { start } from "node:repl";

let ELIZA_RESPONES = [
	{
		patterns: [/(?<x>[\w\s]*)hello(?<y>[\w\s]*)/i],
		responses: ["How do you do. Please state your problem."],
	},
	{
		patterns: [/(?<x>.*)(?<pronoun>\b\w+) wants?(?<y>.*)/i],
		responses: [
			"What would it mean if $pronoun got$y?",
			"Why do $pronoun want$y",
			"Suppose $pronoun got$y soon",
		],
	},
	{
		patterns: [/(?<x>[\w\s]*)if(?<y>[\w\s]*)/i],
		responses: [
			"Do you really think its likely that you $y",
			"Do you wish that $y",
			"What do you think about $y",
			"Really-- if $y",
		],
	},
	{
		patterns: [/(?<x>.*)\bno\b(?<y>.*)/i],
		responses: [
			"Why not?",
			"You are being a bit negative",
			'Are you saying "NO" just to be negative?',
		],
	},
	{
		patterns: [/(?<x>.*)(?<pronoun>\b\w+)\b(?<past_be>was|were)(?<y>[\w\s]*)/i],
		responses: [
			"$past_be $pronoun really?",
			"Perhaps I already knew $pronoun $past_be$y",
			"Why are you telling me $pronoun $past_be$y now?",
		],
	},
	{
		patterns: [/(?<x>.*)\b(?<pronoun>\w+) feels? (?<y>.*)/],
		responses: ["$do $pronoun often feel $y?"],
	},
	{
		patterns: [/(?<x>.*)\b(?<pronoun>\w+) felt? (?<y>.*)/],
		responses: ["What other feelings $do $pronoun have?"],
	},
];

let PRONOUN_CONTRAST = new Map([
	[/you/gi, "me"],
	[/I\b/gi, "you"],
]);

function substitute(string, replacements) {
	let str = string;
	for (const [placeholder, value] of replacements) {
		str = str.replaceAll("$" + placeholder, value);
	}
	return str;
}

function flip_pronouns(input) {
	let str = input;
	for (const [pronoun, contrastive] of PRONOUN_CONTRAST) {
		str = str.replaceAll(pronoun, contrastive);
	}
	return str;
}

function fix_grammar(replacements) {
	if (replacements.get("pronoun") === "I") {
		replacements.set("past_be", "were");
	}
	// becomes you
	if (replacements.get("pronoun") === "I") {
		replacements.set("are", "are");
	} else {
		replacements.set("are", "is");
	}
	if (
		replacements.get("pronoun") &&
		replacements.get("pronoun").match(/(i\b|you|they)/i)
	) {
		replacements.set("do", "do");
	} else {
		replacements.set("do", "does");
	}
	if (
		replacements.get("pronoun") &&
		replacements.get("pronoun").match(/(is?he)/i)
	) {
		replacements.set("have", "has");
	} else {
		replacements.set("have", "have");
	}
	for (const [k, v] of replacements) {
		replacements.set(k, flip_pronouns(v));
	}
	// replacements = new Map(
	// 	Object.entries(replacements).map(([k, v]) => [k, flip_pronouns(v)]),
	// );
	return replacements;
}

function eliza_step(input) {
	for (const { patterns, responses } of ELIZA_RESPONES) {
		// HACK: no functional `any` eqv in js D:
		let matches;
		for (const pattern of patterns) {
			const temp = input.match(pattern);
			if (temp) {
				matches = temp;
				break;
			}
		}
		// console.log("Match", matches);
		if (matches) {
			// console.log(matches);
			matches = new Map(Object.entries(matches.groups));
			matches = fix_grammar(matches);
			// console.log(matches);
			let response = responses[Math.floor(Math.random() * responses.length)];
			response = substitute(response, matches);
			return response;
		}
	}
	return "Pardon?";
}

function eliza_repl(input, _context, _filename, callback) {
	callback(null, eliza_step(input));
}

if (process.argv[2]) {
	console.log(eliza_step(process.argv[2]));
} else {
	start({ prompt: "> ", eval: eliza_repl });
}
