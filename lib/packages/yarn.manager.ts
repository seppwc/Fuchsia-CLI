import { AbstractPackageManager } from './Abstract.Manager'

export class YARNPackageManager extends AbstractPackageManager {
  constructor() {
    super('yarn')
  }

  install() {}
  build() {}
  update() {}
}
