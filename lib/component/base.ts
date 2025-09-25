import { ComponentError } from "./error";

export class Component extends EventTarget {
  static get random() {
    return (
      crypto?.randomUUID() ||
      `${Date.now()}-${(Math.random() * 1e6).toFixed(0)}`
    );
  }

  static get componentId(): string {
    const propertyKey = "__componentId__";
    if (!Object.hasOwn(this, propertyKey)) {
      Object.defineProperty(this, propertyKey, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: Component.random,
      });
    }
    return (this as typeof this & { [propertyKey]: string })[propertyKey];
  }

  static isComponent(obj: any): obj is Component {
    return obj instanceof Component;
  }

  #id = [
    (this.constructor as Function & { componentId: string }).componentId,
    Component.random,
  ].join("@");

  get id() {
    return this.#id;
  }

  /**
   * Gets the component class name.
   *
   * __IMPORTANT__: This is not minification safe.
   */
  get name() {
    return this.constructor.name;
  }

  generateError(message: string) {
    throw new ComponentError(message, {
      cause: {
        component: { id: this.id, name: this.name },
      },
    });
  }
}

export interface ComponentConstructor<T extends Component = Component> {
  new (...args: any[]): T;
  componentId: string;
}
