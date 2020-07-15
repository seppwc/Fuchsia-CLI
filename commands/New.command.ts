import { AbstractCommand } from './Abstract.command'
import { CommanderStatic } from 'commander'

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
      .action(async (name: string, command: CommanderStatic) => {
        const inputs: any[] = []
        inputs.push({ name: 'name', value: name })

        const options: any[] = []
        options.push({ name: 'directory', value: command.directory })

        await this.action.handle(inputs, options)
      })
  }
}
