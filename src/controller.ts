import { PluginComponent, PluginSubstrate } from "./interfaces";

export abstract class Controller
  extends EventTarget
  implements PluginSubstrate
{
  #registry = new Map<string, PluginComponent>();

  compose<
    ComponentConstructor extends { new (...args: any[]): PluginComponent }
  >(
    component: ComponentConstructor,
    ...parameters: ComponentConstructor extends { new (...args: infer P): any }
      ? P
      : never[]
  ) {
    const controller = this;
    const plugin = new (class extends component {
      override get context() {
        return controller;
      }
    })(...parameters);
    this.#registry.set(component.name, plugin);
    return this;
  }

  find<
    T extends PluginComponent,
    PluginConstructor extends { new (...args: any[]): T }
  >(plugin: PluginConstructor): InstanceType<PluginConstructor> | null {
    return (
      (this.#registry.get(plugin.name) as InstanceType<PluginConstructor>) ||
      null
    );
  }

  require<
    T extends PluginComponent,
    PluginConstructor extends { new (...args: any[]): T }
  >(plugin: PluginConstructor): InstanceType<PluginConstructor> {
    const found = this.find(plugin);
    if (!found) {
      throw new Error(`Controller is missing required plugin: ${plugin.name}`);
    }
    return found as InstanceType<PluginConstructor>;
  }
}
