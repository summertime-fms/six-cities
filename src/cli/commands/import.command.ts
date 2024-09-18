import { Command } from "./command.interface.js"
import { TSVReader } from "../../shared/libs/file-reader/TSVReader.js"

export class ImportCommand implements Command {
  private : string = ''
  constructor(
  ) {}

  public getName(): string {
    return '--import'
  }

  public async execute(..._params: string[]):Promise<void> {
    const [filename] = _params
    const reader = new TSVReader(filename.trim())
    try {
      reader.read()
      console.log(reader.toArray())
    } catch(error: unknown) {
      console.error(`Failed to import`)
    }
  }
}
