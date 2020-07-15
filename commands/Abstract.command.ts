import { CommanderStatic } from 'commander'

export abstract class AbstractCommand {
  constructor(protected action: any) {}

  public abstract load(program: CommanderStatic): void
}
