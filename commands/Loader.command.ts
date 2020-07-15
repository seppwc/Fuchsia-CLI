import chalk from 'chalk'
import { CommanderStatic } from 'commander'
import { NewCommand } from './New.command'
import { NewAction } from '../actions'

/**
 * @class CommandLoader
 * @classdesc ClassModule for loading CLI commands into Fennec/CLI
 *
 * @static load
 */

export class CommandLoader {
  public static load(program: CommanderStatic): void {
    new NewCommand(new NewAction()).load(program)

    // TODO make other command Classes
    // build
    // start
    // make

    this.handleInvalidCommand(program)
  }

  private static handleInvalidCommand(program: CommanderStatic): void {
    /**
     *  @param program: commander.CommanderStatic
     *  @returns void
     *  @description
     *      checks the entered command if is not registered through commanderLoader throws the below
     *      error in the console and exits process
     */

    program.on('command:*', () => {
      console.error(`\nInvalid command: ${chalk.red('%s')}`, program.args.join(' '))
      console.log(`See ${chalk.red('--help')} for a list of available commands.\n`)
      process.exit()
    })
  }
}
