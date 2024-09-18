import { CLIApplication, HelpCommand, VersionCommand } from './cli/index.js'

function bootstrap() {
  const CLIApp = new CLIApplication
  CLIApp.registerCommands([new HelpCommand, new VersionCommand])

  CLIApp.processCommand(process.argv)
}

bootstrap()
