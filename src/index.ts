import { Component } from "@lib/component";
import { PluginContext } from "@lib/plugin";

class PluginEvent extends Event {
  static readonly PLUGIN_ASSEMBLING = "plugin-assembling";
  static readonly PLUGIN_ASSEMBLED = "plugin-assembled";
}

export class Plugin extends Component {
  static assemble(...plugins: Plugin[]) {
    const context = new PluginContext(...plugins);
    plugins.forEach((p) => {
      p.dispatchEvent(new PluginEvent(PluginEvent.PLUGIN_ASSEMBLING));
      p.#context = context;
    });
    context.dispatchEvent(new PluginEvent(PluginEvent.PLUGIN_ASSEMBLED));
  }

  #context?: PluginContext;

  get standalone() {
    return !this.#context;
  }

  get #eventTarget(): EventTarget {
    if (this.standalone) return this;
    return this.#context!;
  }

  override dispatchEvent(
    ...params: Parameters<EventTarget["dispatchEvent"]>
  ): ReturnType<EventTarget["dispatchEvent"]> {
    return this.#eventTarget.dispatchEvent(...params);
  }

  override addEventListener(
    ...params: Parameters<EventTarget["addEventListener"]>
  ): ReturnType<EventTarget["addEventListener"]> {
    return this.#eventTarget.addEventListener(...params);
  }

  override removeEventListener(
    ...params: Parameters<EventTarget["removeEventListener"]>
  ): ReturnType<EventTarget["removeEventListener"]> {
    return this.#eventTarget.removeEventListener(...params);
  }
}
