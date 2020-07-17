import { AbstractPackageManager } from './Abstract.Manager'

export class NPMPackageManager extends AbstractPackageManager {
  constructor() {
    super('npm')
  }
  install() {}
  build() {}
  update() {}
}
