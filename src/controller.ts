import { Delegate } from "./delegate";
import { Emittable } from "./emittable";

export abstract class Controller extends Emittable {
  #registry = new Map<string, Delegate>();

  compose<
    Plugin extends Delegate,
    PluginParameters extends unknown[],
    PluginClass extends {
      new (emittable: Emittable, ...args: PluginParameters): Plugin;
    }
  >(plugin: PluginClass, ...args: PluginParameters) {
    this.#registry.set(plugin.name, new plugin(this, ...args));
    return this;
  }

  find<
    Plugin extends Delegate,
    PluginClass extends {
      new (emittable: Emittable, ...args: any[]): Plugin;
    }
  >(plugin: PluginClass): InstanceType<PluginClass> | null {
    return (
      (this.#registry.get(plugin.name) as InstanceType<PluginClass>) ||
      null
    );
  }
}
