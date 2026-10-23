// Crea (la primera vez) y actualiza el proyecto Android, y lo abre en Android Studio.
const { execSync } = require("child_process"), fs = require("fs"), path = require("path");
const R = path.join(__dirname, "..");
const run = c => { console.log("\n> " + c); execSync(c, { stdio: "inherit", cwd: R, shell: true }); };
if (!fs.existsSync(path.join(R, "android"))) run("npx cap add android");
run("npx cap sync android");
run("npx cap open android");
console.log("\nEn Android Studio: menú Build > Build App Bundle(s) / APK(s) > Build APK(s).");
