#!/usr/bin/env node
import { CLIApplication} from './cli/index.js'
import {resolve} from 'node:path';
import {glob} from 'glob';
import { Command } from './cli/commands/command.interface.js';

function isCommandClass(importedItem: Function) {
  return importedItem.prototype && typeof importedItem.prototype.execute === 'function'
}

async function bootstrap() {
  const CLIApp = new CLIApplication
  const importedCommands: Command[] = [];
  const commandsFiles: string[] = glob.sync('src/cli/commands/*.command.ts');
  for (const file of commandsFiles) {
    const filePath = resolve(file);
    const importedItems = await import(filePath);

    for (const exportKey of Object.keys(importedItems)) {
      const exportItem = importedItems[exportKey]
      if (isCommandClass(exportItem)) {
        importedCommands.push(new exportItem());
      }
    }
  }
  CLIApp.registerCommands(importedCommands)

  CLIApp.processCommand(process.argv)
}

bootstrap()
