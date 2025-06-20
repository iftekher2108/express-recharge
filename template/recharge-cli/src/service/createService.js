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

module.exports = function createService(name, module) {
  // ✅ Corrected stub path from src/service → ../../stub/service
  const stubFile = path.resolve(__dirname, '../../stub/services/module.js');

  const serviceFileName = `${name}.js`;
  const targetFolder = path.resolve(process.cwd(), 'Modules', module, 'Services');
  const destFile = path.join(targetFolder, serviceFileName);

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
    console.log(`⚠️ Service '${serviceFileName}' already exists in module '${module}'.`);
    return;
  }

  const content = fs.readFileSync(stubFile, 'utf-8');
  const finalContent = replacePlaceholders(content, replacements);

  fs.writeFileSync(destFile, finalContent);
  console.log(`✅ Service '${serviceFileName}' created in module '${module}'`);
};
