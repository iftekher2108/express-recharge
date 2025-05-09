
const fs = require('fs');
const path = require('path');

function replacePlaceholders(text, replacements) {
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    text = text.replace(regex, value);
  }
  return text;
}

function renamePlaceholders(name, replacements) {
  return name
    .replace(/Module/g, replacements.moduleName)
    .replace(/module/g, replacements.moduleNameLower);
}

function copyAndReplace(from, to, replacements) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });

  fs.readdirSync(from).forEach(item => {
    const srcPath = path.join(from, item);

    // Rename folder or file if it contains "Module" or "module"
    const renamedItem = renamePlaceholders(item, replacements);
    const destPath = path.join(to, renamedItem);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyAndReplace(srcPath, destPath, replacements);
    } else {
      let content = fs.readFileSync(srcPath, 'utf-8');
      content = replacePlaceholders(content, replacements);
      fs.writeFileSync(destPath, content);
    }
  });
}

module.exports = function createModule(name) {
  const stubPath = path.resolve(__dirname, '../stub/module');
  const targetPath = path.resolve(process.cwd(), 'Modules', name);

  if (fs.existsSync(targetPath)) {
    console.log(`⚠️ Module '${name}' already exists.`);
    return;
  }

  const replacements = {
    moduleName: name,
    moduleNameLower: name.toLowerCase()
  };
  console.log(`📦 Creating module '${name}'...`);
  copyAndReplace(stubPath, targetPath, replacements);
  console.log(`✅ Module '${name}' created successfully at Modules/${name}`);
};