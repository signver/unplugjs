import { Component } from "@lib/component";
import { PluginContext } from "@lib/plugin";
import { PluginEvent } from "./event";

export class Plugin extends Component {
  static assemble(...plugins: Plugin[]) {
    const context = new PluginContext(...plugins);
    plugins.forEach((p) => {
      if (p.#context) {
        throw new Error("Plugin is already part of a plugin assembly");
      }
      p.#context = context;
      p.#context.addEventListener(PluginEvent.PLUGIN_ASSEMBLED, () => {
        p.dispatchEvent(new PluginEvent(PluginEvent.PLUGIN_ASSEMBLED));
      });
    });
    context.dispatchEvent(new PluginEvent(PluginEvent.PLUGIN_ASSEMBLED));
    return context;
  }

  #context?: PluginContext;

  get context() {
    return this.#context;
  }

  get standalone() {
    return !this.context;
  }
}
