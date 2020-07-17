export abstract class AbstractPackageManager {
  constructor(protected pkg: string) {}

  public abstract install(): void
  public abstract build(): void
  public abstract update(): void

  public load() {}
}
