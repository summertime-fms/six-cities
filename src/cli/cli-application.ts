import {Command} from './commands/command.interface.js'
import {CommandParser} from './command-parser.js';

type CommandCollection = Record<string, Command>

export class CLIApplication {
  private commands: CommandCollection = {}
  constructor(
    private readonly defaultCommand: string = '--help'
  ) {}

  public registerCommands(commandsList: Command[]) {
    commandsList.forEach(command => {
      const name = command.getName()
      if (Object.hasOwn(this.commands, name)) {
        throw new Error(`Command ${name} has already been registered`)
      }
      this.commands[name] = command;
    })
  }

  public getCommand(commandName: string) {
    return this.commands[commandName] ?? this.getDefaultCommand()
  }

  private getDefaultCommand() {
    const defaultCommand = this.commands[this.defaultCommand]
    if (!defaultCommand) {
      throw new Error("Default command isn't declared")
    }
    return defaultCommand
  }

  public processCommand(args: string[]) {
    const parsedCommand = CommandParser.parse(args)
    const commandName = Object.keys(parsedCommand)[0]
    const command = this.getCommand(commandName)
    const commandArgs = parsedCommand[commandName] ?? []
    command.execute(...commandArgs)
  }
}
