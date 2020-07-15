import { ChildProcess, spawn } from 'child_process'

export abstract class AbstractRunner {
  constructor(protected process: string) {}

  public async run(command: string, cwd: string = process.cwd()): Promise<null | string> {
    return new Promise<null | string>((resolve, reject) => {
      const child: ChildProcess = spawn(`${this.process}`, [command], {
        cwd,
        stdio: 'pipe',
        shell: true,
      })

      child.stdout?.on('data', (data) => console.log(data.toString()))

      child.on('close', (code) => {
        if (code === 0) {
          resolve(null)
        } else {
          console.error(`THERE WAS AN ERROR WITH ${this.process} ${command}`)
          reject()
        }
      })
    })
  }
}
