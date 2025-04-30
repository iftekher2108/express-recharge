const path = require("path");
const minimist = require("minimist");

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const [command] = args._;

  switch (command) {
    case "recharge":
        console.log("Recharge CLI is running...");
        console.log("Use 'recharge-cli help' for a list of commands.");
        console.log('Available commands: recharge-cli make:module --name="hello"');
        console.log("Available commands: recharge-cli make:controller --name=hello");
        console.log('Available commands: recharge-cli make:model --name="hello"')
        console.log("Available commands: recharge-cli make:route --name=hello");
       
        // console.log("Available commands: recharge-cli make:service --name=hello");
        // console.log("Available commands: recharge-cli make:middleware --name=hello");
        // console.log("Available commands: recharge-cli make:validator --name=hello");
        // console.log("Available commands: recharge-cli make:config --name=hello");
        // console.log("Available commands: recharge-cli make:seed --name=hello");
        // console.log("Available commands: recharge-cli make:migration --name=hello");
        // console.log("Available commands: recharge-cli make:job --name=hello");
        // console.log("Available commands: recharge-cli make:queue --name=hello");
        // console.log("Available commands: recharge-cli make:template --name=hello");

      break;
    case "make:module":
      require(path.join(__dirname, "src/initModule"))(args);
      console.log(`${path.join(__dirname, "src/initModule")}`);
      break;
    case "make:controller":
        // require(path.join(__dirname, "src/initController"))(args);
        console.log("Controller creation is not implemented yet.")
        break;
    default:
      console.log("❌ Unknown command:", command);
      console.log('✅ Available: make:module --name="hello"');
      console.log("❌ No command provided. Use 'recharge-cli help' for a list of commands.");
  }
};
