import { Controller } from "./controller";
import { Plugin } from "./component";

describe("Plugin", () => {
  it("should throw if the base context is missing", () => {
    class TestPlugin extends Plugin {}
    const plugin = new TestPlugin();
    expect(() => plugin.context).toThrow();
  });
});

describe("Controller", () => {
  it("is able to compose and lookup the plugin", () => {
    class TestController extends Controller {}
    class TestPlugin1 extends Plugin {
      constructor(public a: number) {
        super();
      }
    }
    class TestPlugin2 extends Plugin {}
    class TestPlugin3 extends Plugin {}
    const controller = new TestController()
      .compose(TestPlugin1, 33)
      .compose(TestPlugin2);
    expect(controller.find(TestPlugin3)).toBeNull();
    expect(controller.find(TestPlugin2)).toEqual(expect.any(TestPlugin2));
    expect(controller.find(TestPlugin1)).toEqual(expect.any(TestPlugin1));
    expect(controller.find(TestPlugin1).a).toBe(33);
    expect(controller.find(TestPlugin1).context).toBe(controller);
  });
});
