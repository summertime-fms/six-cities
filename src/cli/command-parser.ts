type ParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(args: string[]): ParsedCommand {
    const parsed: ParsedCommand = {}
    let currentCommand = '';
    args.forEach(arg => {
      if (arg.startsWith('--')) {
        parsed[arg] = [];
        currentCommand = arg
      } else if (currentCommand && arg) {
        parsed[currentCommand].push(arg)
      }
    })

    return parsed;
  }
}
