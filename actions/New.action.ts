import { AbstractAction } from './Abstract.action';

export class NewAction extends AbstractAction {
  public async handle(
    inputs: any[],
    options: any[],
    additionalFlags: any[]
  ): Promise<void> {
    console.log(inputs, options, additionalFlags);
  }
}
