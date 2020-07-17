import { AbstractCommand } from './Abstract.command'
import { CommanderStatic } from 'commander'
import inquirer from 'inquirer'
import { IUserAnswers, questions } from '../lib'
import chalk from 'chalk'

export class NewCommand extends AbstractCommand {
  /**
   * @class NewCommand
   * @extends AbstractCommand
   * @classdesc Registers the New command to fennec cli
   *  ```fnc new [directory]```
   * @constructor(new Action)
   *
   */

  load(program: CommanderStatic): void {
    /**
     * @method load
     * @param program
     * @returns void
     *
     * @description loads the new command into the commnder program
     *
     */
    program
      .command('new [name]')
      .alias('n')
      .description('Creates a new FuchsiaJS project')
      .option(
        '--directory [directory]',
        'Specify the destination directory for your project'
      )
      .action(async (name: string) => {
        const inputs: any[] = []
        inputs.push({ name: 'name', value: name })
        console.clear()
        console.log(chalk.cyan('FuchsiaJS Project Setup'))
        console.log(chalk.cyan('____________________\n\n'))

        // prompt user for inputs
        const { language, packageManager } = questions
        const answers: IUserAnswers = await inquirer.prompt([language, packageManager])

        // call passed handler with inputs and answers to perform async actions
        await this.action.handle(inputs, answers)
      })
  }
}
