export class PluginEvent extends Event {
  static readonly PLUGIN_ASSEMBLING = "plugin://assemble?state=pending";
  static readonly PLUGIN_ASSEMBLED = "plugin://assemble?state=done";
}
