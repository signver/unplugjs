import { PluginContext } from "@lib/plugin";
import { Plugin } from "./plugin";
import { PluginEvent } from "./event";

describe("static", () => {
  describe("assemble", () => {
    it("should attach context to the plugin and dispatch an event when done", () => {
      class Plugin1 extends Plugin {}
      const p1 = new Plugin1();
      const pluginEventSpy1 = jest.fn();
      p1.standalone.addEventListener(
        PluginEvent.PLUGIN_ASSEMBLED,
        pluginEventSpy1
      );
      expect(() =>
        p1.addEventListener(PluginEvent.PLUGIN_ASSEMBLED, pluginEventSpy1)
      ).toThrow();
      const system = Plugin.assemble(p1);
      expect(system).toBeInstanceOf(PluginContext);
      expect(pluginEventSpy1).toHaveBeenCalledTimes(1);
      const dispatchedEvent = pluginEventSpy1.mock.lastCall[0];
      expect(dispatchedEvent).toBeInstanceOf(PluginEvent);
      expect(dispatchedEvent.target).toBe(p1);
    });
    it("should attach multiple plugins", () => {
      class Plugin1 extends Plugin {}
      class Plugin2 extends Plugin {}
      const p1 = new Plugin1();
      const p2 = new Plugin2();
      const pluginEventSpy1 = jest.fn();
      const pluginEventSpy2 = jest.fn();
      p1.standalone.addEventListener(
        PluginEvent.PLUGIN_ASSEMBLED,
        pluginEventSpy1
      );
      p2.standalone.addEventListener(
        PluginEvent.PLUGIN_ASSEMBLED,
        pluginEventSpy2
      );
      const system = Plugin.assemble(p1, p2);
      expect(pluginEventSpy1).toHaveBeenCalledTimes(1);
      expect(pluginEventSpy1.mock.lastCall[0]?.target).toBe(p1);
      expect(pluginEventSpy2.mock.lastCall[0]?.target).toBe(p2);
    });
  });
});
