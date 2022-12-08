/// script clean
/// remove old parent project and install current parent project

const packagejson = require("./package.json");
const packages = Object.keys(packagejson.dependencies).concat(Object.keys(packagejson.devDependencies));
const { spawn } = require("cross-spawn");

const toUninstall = [];
packages.forEach(function (pkg) {
  if (/^hexo-(blogger-xml|seo|adsense|generator-redirect)$/s.test(pkg)) toUninstall.push(pkg);
});
/**
 * @type {ReturnType<typeof spawn>}
 */
let child;
if (toUninstall.length > 0) {
  child = spawn("npm", ["un", ...toUninstall], { cwd: __dirname, stdio: "inherit" });
  child.on("close", reinstall);
} else {
  reinstall();
}

function reinstall() {
  console.log("installing demo");
  child = spawn("npm", ["install"], { cwd: __dirname, stdio: "inherit" });
  child.on("close", function () {
    console.log("reinstalling file:./../../");
    spawn("npm", ["i", "file:./../../"], { cwd: __dirname, stdio: "inherit" });
  });
}
