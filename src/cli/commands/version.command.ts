import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "./command.interface.js";

type TypePackageJSON = {
  version: string
}

function isPackageJSON(content: unknown): content is TypePackageJSON {
  return (
    typeof content == 'object' &&
    content !== null &&
    !Array.isArray(content) &&
    Object.hasOwn(content, 'version')
  )
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {};

  public getName(): string {
    return '--version';
  }

  private readVersion(): string {
    const packageJSON = readFileSync(resolve(this.filePath), 'utf8')
    const parsedFile: unknown = JSON.parse(packageJSON);
    if (!isPackageJSON(parsedFile)) {
      throw new Error('Failed to read version')
    }

    return parsedFile.version;
  }

  public async execute(..._params: string[]):Promise<void> {
    try {
      const version: string = this.readVersion();
      console.info(version);
    } catch(error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);
    }
  }
}
