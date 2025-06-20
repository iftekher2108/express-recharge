const path = require('path');
const fs = require('fs');

function replacePlaceholders(text, replacements) {
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    text = text.replace(regex, value);
  }
  return text;
}

module.exports = function createMiddleware(name, module) {
  // ✅ Correct path to middleware stub
  const stubFile = path.resolve(__dirname, '../../stub/Middlewares/module.js');

  const middlewareFileName = `${name}.js`;
  const targetFolder = path.resolve(process.cwd(), 'Modules', module, 'Middlewares');
  const destFile = path.join(targetFolder, middlewareFileName);

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
    console.log(`⚠️ Middleware '${middlewareFileName}' already exists in module '${module}'.`);
    return;
  }

  const content = fs.readFileSync(stubFile, 'utf-8');
  const finalContent = replacePlaceholders(content, replacements);

  fs.writeFileSync(destFile, finalContent);
  console.log(`✅ Middleware '${middlewareFileName}' created in module '${module}'`);
};