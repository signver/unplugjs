import { Component } from "@lib/component";
import { PluginContext } from "@lib/plugin";
import { PluginEvent } from "./event";
import { PluginError } from "@lib/error/plugin";

export class Plugin extends Component {
  static assemble(...plugins: Plugin[]) {
    const context = new PluginContext(...plugins);
    plugins.forEach((p) => {
      if (p.#context) {
        throw new Error("Plugin is already part of a plugin assembly");
      }
      p.#context = context;
      p.#context.addEventListener(PluginEvent.PLUGIN_ASSEMBLED, () => {
        p.standalone.dispatchEvent(new PluginEvent(PluginEvent.PLUGIN_ASSEMBLED));
      });
    });
    context.dispatchEvent(new PluginEvent(PluginEvent.PLUGIN_ASSEMBLED));
    return context;
  }

  #context?: PluginContext;

  get standalone(): EventTarget {
    return {
      addEventListener:(
        ...params: Parameters<EventTarget["addEventListener"]>
      ): ReturnType<EventTarget["addEventListener"]> =>{
        return super.addEventListener(...params);
      },
      dispatchEvent: (
        ...params: Parameters<EventTarget["dispatchEvent"]>
      ): ReturnType<EventTarget["dispatchEvent"]> => {
        return super.dispatchEvent(...params);
      },
      removeEventListener: (
        ...params: Parameters<EventTarget["removeEventListener"]>
      ): ReturnType<EventTarget["removeEventListener"]> => {
        return super.removeEventListener(...params);
      },
    };
  }

  addEventListener(
    ...params: Parameters<EventTarget["addEventListener"]>
  ): ReturnType<EventTarget["addEventListener"]> {
    if (!this.#context) {
      throw new PluginError();
    }
    return this.#context.addEventListener(...params);
  }

  dispatchEvent(
    ...params: Parameters<EventTarget["dispatchEvent"]>
  ): ReturnType<EventTarget["dispatchEvent"]> {
    if (!this.#context) {
      throw new PluginError();
    }
    return this.#context.dispatchEvent(...params);
  }

  removeEventListener(
    ...params: Parameters<EventTarget["removeEventListener"]>
  ): ReturnType<EventTarget["removeEventListener"]> {
    if (!this.#context) {
      throw new PluginError();
    }
    return this.#context.removeEventListener(...params);
  }
}
