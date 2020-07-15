import { AbstractAction } from './Abstract.action'
import { GitRunner, IUserAnswers, Repository } from '../lib'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { DEFAULTS } from '../lib'
import ora from 'ora'

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
      console.info(`Repository cloned from: ${repo}`)
      console.log('')
      console.info(`cd ${dir}`)
      console.info(`npm install`)
    } catch {
      spinner.fail()
      console.error('THERE WAS AN ERROR COPYING THE REPO, BAD LUCK')
    }
  }

  // private async installDependancies() {}
}
