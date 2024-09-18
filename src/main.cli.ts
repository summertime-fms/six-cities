#!/usr/bin/env node
import { CLIApplication, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js'

function bootstrap() {
  const CLIApp = new CLIApplication
  CLIApp.registerCommands([new HelpCommand, new VersionCommand, new ImportCommand])

  CLIApp.processCommand(process.argv)
}

bootstrap()
