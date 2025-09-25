import { PluginError } from "@lib/error/plugin";
import { PluginContext } from "@lib/plugin";

export class PluginEvent extends Event {
  static readonly PLUGIN_ASSEMBLING = "plugin-assembling";
  static readonly PLUGIN_ASSEMBLED = "plugin-assembled";

  get context() {
    const target = this.target;
    if (!(target instanceof PluginContext)) {
      throw new PluginError("Event target is not a PluginContext");
    }
    return target;
  }
}
