import { PlatformError } from "./errors";

export class Platform {
  constructor(
    public readonly name: string,
    public readonly id = crypto.randomUUID()
  ) {}

  #registry = new Map<string, any>();

  link<TCtor extends { new (...args: any[]): any }>(
    Ctor: TCtor,
    ...params: ConstructorParameters<TCtor>
  ) {
    if (this.#registry.has(Ctor.name)) {
      throw new PlatformError();
    }
    this.#registry.set(Ctor.name, new Ctor(...params));
    return this;
  }
}
