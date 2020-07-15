import { AbstractAction } from './Abstract.action'
import { GitRunner, IUserAnswers, Repository } from '../lib'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { DEFAULTS } from '../lib'
import ora from 'ora'
import chalk from 'chalk'

export class NewAction extends AbstractAction {
  /**
   * @class NewAction
   * @extends AbstractAction
   * @classdesc handles desired actions for the new command
   *
   *
   */

  public async handle(inputs: any[], options: IUserAnswers): Promise<void> {
    /**
     * @method handle
     * @param inputs
     * @param options
     * @description entry point for handling the process
     * takes in inputs and options
     * checks if dir exisits if not creates it, checks their answers inset up and inits project
     */
    const dir = inputs[0].value
    if (!existsSync(dir)) {
      mkdirSync(join(process.cwd(), dir))
      console.log(`Project directory created at: ${join(process.cwd(), dir)}`)
    }
    const git = options.language === 'Typescript' ? DEFAULTS.git : Repository.JAVASCRIPT

    await this.cloneGitRepository(git, dir)
    // await this.installDependancies()
  }

  private async cloneGitRepository(repo: string, dir: string) {
    /**
     *  @private
     *  @method cloneGitRepository
     *  @param repo
     *  @param dir
     *
     */

    const spinner = ora({
      spinner: {
        interval: 120,
        frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
      },
      text: 'Cloning Repository...',
    })
    spinner.start()
    try {
      const runner = new GitRunner()

      await runner.run(['clone', repo, '.'], join(process.cwd(), dir))
      spinner.succeed()
      console.clear()
      console.info(
        `${chalk.yellow(
          'Congratulations! FennecJS project created in '
        )} ${chalk.yellowBright.underline.italic(dir)} \n\nTo start development: \n`
      )
      console.info('\tChange into directory: \n')
      console.info(chalk.blue(`\t\t ${chalk.italic('cd')} ${dir} \n\n`))
      console.info('\tInstall dependancies: \n')
      console.info(chalk.blue(`\t\t ${chalk.italic('npm install')} \n\n`))
      console.info('\tStart development server: \n')
      console.info(chalk.blue(`\t\t ${chalk.italic('fnc start')} \n\n`))
    } catch {
      spinner.fail()
      console.error('THERE WAS AN ERROR COPYING THE REPO, BAD LUCK')
    }
  }

  // private async installDependancies() {}
}
