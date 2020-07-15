import { AbstractAction } from './Abstract.action'
import { GitRunner } from '../lib'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

export class NewAction extends AbstractAction {
  public async handle(inputs: any[]): Promise<void> {
    const dir = inputs[0].value
    if (!existsSync(dir)) {
      mkdirSync(join(process.cwd(), dir))
      console.log(`Project directory created at: ${join(process.cwd(), dir)}`)
    }
    await this.initialiseGitRepository(dir)
  }

  private async initialiseGitRepository(dir: string) {
    const runner = new GitRunner()

    await runner.run('init', join(process.cwd(), dir)).catch(() => {
      console.error('ERROR WITH GIT')
    })
  }
}
