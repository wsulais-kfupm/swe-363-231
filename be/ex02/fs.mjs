import { readdir, copyFile } from "node:fs/promises";
import process from "https://deno.land/std@0.120.0/node/process.ts";

async function get_dir(path, ext) {
	const exts = ext ?? ["txt", "jpg"];
	const files = await readdir(path, { withFileType: true });
	return files.filter((f) => exts.some((e) => f.endsWith(e)));
}

const args = process.argv.slice();
const src_dir = args[2];
const dest_dir = args[3] ?? ".";
const filter = args.slice(4);

console.log(`Copying all ${filter ?? "default"} files in '${src_dir}' to '${dest_dir}' `)

const files = await get_dir(src_dir, filter);

console.log(files);

for (const file of files) {
	const src = src_dir + "/" + file;
	const dest = dest_dir + "/" + file;
	console.log(`Copying '${src}' to '${dest}'`);
	await copyFile(src, dest);
}
