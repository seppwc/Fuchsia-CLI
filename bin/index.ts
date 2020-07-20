#!/usr/bin/env node
import commander, { CommanderStatic } from 'commander'
import { CommandLoader } from '../commands'
import { localBinExists, loadLocalBinCommandLoader } from '../lib'

const bootstrap = () => {
  const program: CommanderStatic = commander
  program
    .version(
      require('../package.json').version,
      '-v, --version',
      'Output the current version'
    )
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output useage information')

  if (localBinExists()) {
    const localCommandLoader = loadLocalBinCommandLoader()
    localCommandLoader.load(program)
  } else {
    CommandLoader.load(program)
  }

  if (!process.argv.slice(2).length) {
    program.outputHelp()
    process.exit()
  }

  commander.parse(process.argv)
}

bootstrap()
