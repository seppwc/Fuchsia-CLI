export abstract class AbstractAction {
  constructor() {}
  public abstract async handle(
    inputs?: any[],
    options?: any[],
    additionalFlags?: any[]
  ): Promise<void>;
}
