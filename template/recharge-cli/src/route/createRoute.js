const path = require('path');
const fs = require('fs');

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

module.exports = function createRoute(name, module) {
  // ✅ Route stub path
  const stubFile = path.resolve(__dirname, '../../stub/routes/module.js');

  const routeFileName = `${name}.js`;
  const targetFolder = path.resolve(process.cwd(), 'Modules', module, 'Routes');
  const destFile = path.join(targetFolder, routeFileName);

  const replacements = {
    moduleName: name,
    moduleNameLower: name.toLowerCase()
  };

  if (!fs.existsSync(stubFile)) {
    console.error(`❌ Stub file not found at: ${stubFile}`);
    return;
  }

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  if (fs.existsSync(destFile)) {
    console.log(`⚠️ Route '${routeFileName}' already exists in module '${module}'.`);
    return;
  }

  const content = fs.readFileSync(stubFile, 'utf-8');
  const finalContent = replacePlaceholders(content, replacements);

  fs.writeFileSync(destFile, finalContent);
  console.log(`✅ Route '${routeFileName}' created in module '${module}'`);
};