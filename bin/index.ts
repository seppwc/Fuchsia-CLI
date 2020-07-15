#!/usr/bin/env node
import commander from 'commander'
import { CommandLoader } from '../commands'
import { localBinExists, loadLocalBinCommandLoader } from '../lib'

import pkg from '../package.json'

const bootstrap = () => {
  const program = commander
  program
    .version(pkg.version, '-v, --version', 'Output the current version')
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
