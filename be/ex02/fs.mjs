import { readdir } from "node:fs/promises";

async function get_dir(path, ext) {
	const exts = ext ?? ["txt", "jpg"];
	const files = await readdir(path, { withFileType: true });
	return files.filter((f) => exts.some((e) => f.endsWith(e)));
}

const args = process.argv.slice();
const files = await get_dir(args[2], args.slice(3));

console.log(files);
