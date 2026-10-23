// Usage: node inject.js your-client.html
// Adds <script src="index.js"></script> to the top of <head>.
// Put Wispcraft's dist/index.js in the same folder as the client file.
const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.log("Usage: node inject.js your-client.html");
  process.exit(1);
}

let html = fs.readFileSync(file, "utf8");
if (html.includes('src="index.js"')) {
  console.log("Already injected, nothing to do.");
  process.exit(0);
}
if (!html.includes("<head>")) {
  console.log("Couldn't find a <head> tag in this file.");
  process.exit(1);
}

html = html.replace("<head>", '<head><script src="index.js"></script>');
fs.writeFileSync(file, html);
console.log("Injected. Keep index.js next to " + file);
