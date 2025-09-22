import { Emittable } from "./emittable";

export abstract class Delegate {
  static get uniqueName() {
    return Delegate.constructor.name;
  }

  constructor(protected readonly emittable: Emittable) {}
}
