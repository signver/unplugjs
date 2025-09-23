import type { PluginComponent, PluginSubstrate } from "./interfaces";

export abstract class Plugin implements PluginComponent {
  get context(): PluginSubstrate {
    throw new Error(
      `Plugin(${this.constructor.name}) is missing its plugin context.`
    );
  }
}
