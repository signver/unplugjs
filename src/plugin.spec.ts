import { PluginContext } from "@lib/plugin";
import { Plugin } from "./plugin";
import { PluginEvent } from "./event";

describe("static", () => {
  describe("assemble", () => {
    it("should attach context to the plugin and dispatch an event when done", () => {
      class Plugin1 extends Plugin {}
      const p1 = new Plugin1();
      expect(p1.standalone).toBe(true);
      const pluginEventSpy1 = jest.fn();
      p1.addEventListener(PluginEvent.PLUGIN_ASSEMBLED, pluginEventSpy1);
      const system = Plugin.assemble(p1);
      expect(system).toBeInstanceOf(PluginContext);
      expect(p1.standalone).toBe(false);
      expect(p1.context).toBe(system);
      expect(pluginEventSpy1).toHaveBeenCalledTimes(1);
    });
    it("should attach multiple plugins", () => {
      class Plugin1 extends Plugin {}
      class Plugin2 extends Plugin {}
      const p1 = new Plugin1();
      const p2 = new Plugin2();
      const pluginEventSpy1 = jest.fn();
      const pluginEventSpy2 = jest.fn();
      p1.addEventListener(PluginEvent.PLUGIN_ASSEMBLED, pluginEventSpy1);
      p2.addEventListener(PluginEvent.PLUGIN_ASSEMBLED, pluginEventSpy2);
      const system = Plugin.assemble(p1, p2);
      expect(pluginEventSpy1).toHaveBeenCalledTimes(1);
      expect(pluginEventSpy2).toHaveBeenCalledTimes(1);
      expect(system.find(Plugin1)).toBe(p1);
      expect(system.find(Plugin2)).toBe(p2);
    });
  });
});
