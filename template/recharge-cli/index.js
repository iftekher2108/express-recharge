const path = require("path");
const minimist = require("minimist");
const chalk = require('chalk');

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const [command] = args._;

  switch (command) {
    case "help":
      console.log(
        chalk.bold.blueBright('\n╔══════════════════════════════════════╗')
      );
      console.log(
        chalk.bold.blueBright('║') +
        chalk.bold.whiteBright('       EXPRESS ') +
        chalk.bold.greenBright('RECHARGE CLI       ') +
        chalk.bold.blueBright('║')
      );
      console.log(
        chalk.bold.blueBright('╚══════════════════════════════════════╝\n')
      );

      console.log(chalk.greenBright('🚀 Recharge CLI is running...'));
      console.log(chalk.cyan('💡 Use ') + chalk.yellow.bold('recharge help') + chalk.cyan(' to see all commands.\n'));


      console.log(chalk.magentaBright.bold('📦 Available Commands:\n'));

      console.log(
        chalk.blue('➤ ') +
        chalk.white('recharge ') +
        chalk.green('make:module') +
        chalk.white(' --name=') +
        chalk.yellow('iftekher')
      );
      console.log(
        chalk.blue('➤ ') +
        chalk.white('recharge ') +
        chalk.green('make:controller') +
        chalk.white(' --name=') +
        chalk.yellow('example')+
         chalk.white(' --module=') +
        chalk.yellow('example')
      );
      console.log(
        chalk.blue('➤ ') +
        chalk.white('recharge ') +
        chalk.green('make:model') +
        chalk.white(' --name=') +
        chalk.yellow('iftekher')+
         chalk.white(' --module=') +
        chalk.yellow('example')
      );
      console.log(
        chalk.blue('➤ ') +
        chalk.white('recharge ') +
        chalk.green('make:service') +
        chalk.white(' --name=') +
        chalk.yellow('iftekher')+
         chalk.white(' --module=') +
        chalk.yellow('example')
      );



      console.log('\n' + chalk.gray('──────────────────────────────'));
      console.log(chalk.white('Version:') + chalk.cyan(' 1.0') + '   ' + chalk.white('Support:') + chalk.cyan(' iftekhermahmud1@gmail.com'));
      console.log(chalk.gray('──────────────────────────────\n'));

      
      break;
    case "make:module":
      require(path.join(__dirname, "./src/module/initModule"))(args);
      break;
    case "make:middleware":
      require(path.join(__dirname, "./src/middleware/initMiddleware"))(args);
      break;
    case "make:controller":
      require(path.join(__dirname, "./src/controller/initController"))(args);
      break;
    case "make:route":
      require(path.join(__dirname, "./src/route/initRoute"))(args);
      break;
    case "make:model":
      require(path.join(__dirname, "./src/model/initModel"))(args);
      break;
    case "make:service":
      require(path.join(__dirname, "./src/service/initService"))(args);
      break;
    default:
      console.log("❌ Unknown command:", command);
      console.log("❌ No command provided. Use 'recharge-cli help' for a list of commands.");
  }
};
