
import { Command } from "./command.interface.js"

export class ImportCommand implements Command {
  private : string = '';
  constructor(
  ) {};

  public getName(): string {
    return '--import'
  }

  public async execute(..._params: string[]):Promise<void> {
    try {
      console.info(version);
    } catch(error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);
    }
  }
}
