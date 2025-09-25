import { Component, ComponentConstructor } from "@lib/component";
import { PluginError } from "@lib/error/plugin";

export class PluginContext extends Component {
  #registry = new Map<string, Component>();

  constructor(...components: Component[]) {
    super();
    for (const component of components) {
      if (!(component instanceof Component)) {
        throw new PluginError("Object does not extend from Component");
      }
      const key = (
        component.constructor as ComponentConstructor
      ).componentId;
      if (this.#registry.has(key)) {
        throw new PluginError();
      }
      this.#registry.set(key, component);
    }
  }

  find<T extends Component, U extends ComponentConstructor<T>>(
    ctor: U
  ): InstanceType<U> | undefined {
    return this.#registry.get(ctor.componentId) as InstanceType<U> | undefined;
  }
}
