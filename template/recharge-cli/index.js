const path = require("path");
const minimist = require('minimist');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    const [command] = args._;
  
    switch (command) {
      case 'make:module':
        require(path.join(__dirname, 'src/initModule'))(args);
        break;
      default:
        console.log('❌ Unknown command:', command);
        console.log('✅ Available: make:module --name="hello"');
    }
  };

