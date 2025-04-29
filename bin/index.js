#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectName = process.argv[2];

console.log("🚀 Welcome to Express Recharge CLI!");
console.log(
  "✅ This is working via npx @iftekher2108/express-recharge project-name"
);

if (!projectName) {
  console.error("❌ Please provide a project name.");
  console.log("Usage: npx @iftekher2108/express-recharge my-app");
  process.exit(1);
}

console.log("Creating a new project.");
console.log("Please wait...");

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

const targetPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, "../template");

copyRecursive(templatePath, targetPath);

console.log(`✅ Project '${projectName}' created successfully!`);
console.log("📦 Installing dependencies...");

execSync("npm install", { cwd: targetPath, stdio: "inherit" });

execSync("cp .env.example .env", { cwd: targetPath, stdio: "inherit" });

console.log("🚀 Coping -Copy.env file and rename it to .env !");
console.log("🚀 All done!");
console.log("You can now start building your Express application!");
console.log(`👉 cd ${projectName} && npm start`);
console.log("🚀 Happy coding!");
console.log("🚀 If you have any questions, feel free to ask!");
