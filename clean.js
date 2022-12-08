/// script clean
/// remove old parent project and install current parent project

const packagejson = require("./package.json");
const packages = Object.keys(packagejson.dependencies).concat(Object.keys(packagejson.devDependencies));
const { spawn } = require("cross-spawn");

const toUninstall = [];
packages.forEach(function (pkg) {
  if (/^hexo-(blogger-xml|seo|adsense|generator-redirect)$/s.test(pkg)) toUninstall.push(pkg);
});
if (toUninstall.length > 0) {
  const child = spawn("npm", ["un", ...toUninstall], { cwd: __dirname, stdio: "inherit" });
  child.on("close", function () {
    spawn("npm", ["i", "file:../../"], { cwd: __dirname, stdio: "inherit" });
  });
}
