import { AbstractAction } from './Abstract.action'
import { GitRunner } from '../lib'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { DEFAULTS } from '../lib'
import ora from 'ora'

export class NewAction extends AbstractAction {
  public async handle(inputs: any[]): Promise<void> {
    const dir = inputs[0].value
    if (!existsSync(dir)) {
      mkdirSync(join(process.cwd(), dir))
      console.log(`Project directory created at: ${join(process.cwd(), dir)}`)
    }

    await this.cloneGitRepository(DEFAULTS.git, dir)
    await this.installDependancies()
  }

  private async cloneGitRepository(repo: string, dir: string) {
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

  private async installDependancies() {}
}
