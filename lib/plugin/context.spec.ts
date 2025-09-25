import { Component } from "@lib/component";
import { PluginContext } from "./context";

describe("instance", () => {
  describe("methods", () => {
    describe("find", () => {
      it("should have methods", () => {
        class SubComponent1 extends Component {}
        class SubComponent2 extends Component {}
        class SubComponent3 extends Component {}
        class SubComponent4 extends Component {}
        const subComponent1 = new SubComponent1();
        const subComponent2 = new SubComponent2();
        const subComponent3 = new SubComponent3();
        const context = new PluginContext(
          subComponent1,
          subComponent2,
          subComponent3
        );
        expect(context.find(SubComponent1)).toBe(subComponent1);
        expect(context.find(SubComponent2)).toBe(subComponent2);
        expect(context.find(SubComponent3)).toBe(subComponent3);
        expect(context.find(SubComponent4)).toBeUndefined();
      });
    });
  });
});
