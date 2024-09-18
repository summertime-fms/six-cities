import {Command} from './commands/command.interface.ts'

type CommandCollection = Record<string, Command>

export class CLIApplication {
  private commands: CommandCollection = {}

  public registerCommands(commandsList: Command[]) {
    commandsList.forEach(command => {
      const name = command.getName();
      if (Object.hasOwn(this.commands, name)) {
        throw new Error(`Command ${name} has already been registered`);
      }
      this.commands[name] = command;
    })
  }
}
