const createModule = require("./createModule")
module.exports = (args) => {
    const name = args.name;
  
    if (!name) {
      console.log('❗ Error: --name is required (e.g., make:module --name=Users)');
      return;
    }
  
    createModule(name);
  };