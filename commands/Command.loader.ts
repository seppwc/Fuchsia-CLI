import * as chalk from 'chalk';
import { CommanderStatic } from 'commander';

export class CommandLoader {
  public static load(program: CommanderStatic): void {
    // TODO make other command Classes
    // new
    // build
    // start
    // make

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      console.error(
        `\nInvalid command: ${chalk.red('%s')}`,
        program.args.join(' ')
      );
      console.log(
        `See ${chalk.red('--help')} for a list of available commands.\n`
      );
      process.exit(1);
    });
  }
}
