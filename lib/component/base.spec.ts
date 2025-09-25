import { Component } from "./base";
import { ComponentError } from "./error";

describe("static", () => {
  describe("properties", () => {
    describe("random", () => {
      it("should return a unique identifier string", () => {
        const id1 = Component.random;
        const id2 = Component.random;
        expect(id1).toEqual(expect.any(String));
        expect(id1).toBeTruthy();
        expect(id2).toEqual(expect.any(String));
        expect(id2).toBeTruthy();
        expect(id1).not.toBe(id2);
      });
    });
    describe("componentId", () => {
      it("should return a identifier string", () => {
        const classId = Component.componentId;
        expect(classId).toEqual(expect.any(String));
        expect(classId).toBeTruthy();
      });
      it("should return a unique identifier across derived classes", () => {
        class SubComponent extends Component {}
        const baseId = Component.componentId;
        const subId = SubComponent.componentId;
        expect(baseId).toEqual(expect.any(String));
        expect(baseId).toBeTruthy();
        expect(subId).toEqual(expect.any(String));
        expect(subId).toBeTruthy();
        expect(baseId).not.toBe(subId);
      });
    });
  });
  describe("methods", () => {
    describe("isComponent", () => {
      it("should return true for Component instances", () => {
        const instance = new Component();
        expect(Component.isComponent(instance)).toBe(true);
      });
      it("should return true for Component sub classes", () => {
        class SubComponent extends Component {}
        const instance = new SubComponent();
        expect(Component.isComponent(instance)).toBe(true);
      });
      it("should return false for other types", () => {
        expect(Component.isComponent(null)).toBe(false);
        expect(Component.isComponent(undefined)).toBe(false);
        expect(Component.isComponent(true)).toBe(false);
        expect(Component.isComponent(1)).toBe(false);
        expect(Component.isComponent("")).toBe(false);
        expect(Component.isComponent({})).toBe(false);
        expect(Component.isComponent([])).toBe(false);
        expect(Component.isComponent(() => {})).toBe(false);
      });
    });
  });
  describe("methods", () => {
    describe("isComponent", () => {
      it("should return true for Component instances", () => {
        const instance = new Component();
        expect(Component.isComponent(instance)).toBe(true);
      });
      it("should return true for Component sub classes", () => {
        class SubComponent extends Component {}
        const instance = new SubComponent();
        expect(Component.isComponent(instance)).toBe(true);
      });
      it("should return false for other types", () => {
        expect(Component.isComponent(null)).toBe(false);
        expect(Component.isComponent(undefined)).toBe(false);
        expect(Component.isComponent(true)).toBe(false);
        expect(Component.isComponent(1)).toBe(false);
        expect(Component.isComponent("")).toBe(false);
        expect(Component.isComponent({})).toBe(false);
        expect(Component.isComponent([])).toBe(false);
        expect(Component.isComponent(() => {})).toBe(false);
      });
    });
  });
});

describe("instance", () => {
  const component = new Component();
  describe("properties", () => {
    describe("id", () => {
      it("should return a non-empty and statistically unique string", () => {
        const control = new Component();
        expect(component.id).toEqual(expect.any(String));
        expect(component.id).toBeTruthy();
        expect(component.id).not.toBe(control.id);
      });
    });
    describe("name", () => {
      it("should return the class name", () => {
        expect(component.name).toBe("Component");
      });
    });
  });

  describe("methods", () => {
    describe("generateError", () => {
      it("should throw a ComponentError", () => {
        expect(() => {
          component.generateError("");
        }).toThrow(expect.any(ComponentError));
      });
    });
  });
});
