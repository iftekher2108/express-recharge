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

module.exports = function createController(name, module) {
  // ✅ Corrected stub path from src/controller → ../../stub/Controllers
  const stubFile = path.resolve(__dirname, '../../stub/controllers/ModuleController.js');

  const controllerFileName = `${name}.js`;
  const targetFolder = path.resolve(process.cwd(), 'Modules', module, 'Controllers');
  const destFile = path.join(targetFolder, controllerFileName);

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
    console.log(`⚠️ Controller '${controllerFileName}' already exists in module '${module}'.`);
    return;
  }

  const content = fs.readFileSync(stubFile, 'utf-8');
  const finalContent = replacePlaceholders(content, replacements);

  fs.writeFileSync(destFile, finalContent);
  console.log(`✅ Controller '${controllerFileName}' created in module '${module}'`);
};