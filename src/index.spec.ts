import { Controller } from "./controller";
import { Delegate } from "./delegate";
import { Emittable } from "./emittable";

describe("Controller", () => {
  it("is able to compose and retrieve the delegate class", () => {
    class TestController extends Controller {}
    class TestDelegate1 extends Delegate {
      constructor(emittable: Emittable, public a: number) {
        super(emittable);
      }
    }
    class TestDelegate2 extends Delegate {
      b = 2;
    }

    const controller = new TestController()
      .compose(TestDelegate1, 33)
      .compose(TestDelegate2);

    expect(controller.find(TestDelegate1)).toEqual(expect.any(TestDelegate1));
    expect(controller.find(TestDelegate1).a).toBe(33);
  });
});
