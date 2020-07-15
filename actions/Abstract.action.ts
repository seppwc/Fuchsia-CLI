import { IUserAnswers } from '../lib'

export abstract class AbstractAction {
  constructor() {}
  public abstract async handle(inputs?: any[], answers?: IUserAnswers): Promise<void>
}
