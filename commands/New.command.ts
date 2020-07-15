import { AbstractCommand } from './Abstract.command'
import { CommanderStatic } from 'commander'
import inquirer from 'inquirer'
import { IUserAnswers, questions } from '../lib'

export class NewCommand extends AbstractCommand {
  load(program: CommanderStatic): void {
    program
      .command('new [name]')
      .alias('n')
      .description('Creates a new FennecJS project')
      .option(
        '--directory [directory]',
        'Specify the destination directory for your project'
      )
      .action(async (name: string) => {
        const inputs: any[] = []
        inputs.push({ name: 'name', value: name })

        const { language, packageManager } = questions
        const answers: IUserAnswers = await inquirer.prompt([language, packageManager])

        await this.action.handle(inputs, answers)
      })
  }
}
