const createModule = require("./createModule")
module.exports = (args) => {
    const name = args.name;
  
    if (!name || name.trim() === '' ) {
      console.log('❗ Error: --name is required (e.g., make:module --name=Example)');
      return;
    }
  
    createModule(name);
  };