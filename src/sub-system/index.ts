import { Platform } from "./platform";

type ConstructorComposition<T> = T extends { new (...args: any[]): any }
  ? [T, ...ConstructorParameters<T>]
  : never;

export class SubSystem {
  static compose<T extends { new (...args: any[]): any }>(
    subSystem: InstanceType<T> extends SubSystem ? T : never,
    ...params: ConstructorParameters<T>
  ): ConstructorComposition<T> {
    return [subSystem as T, ...params] as ConstructorComposition<T>;
  }

  static createPlatform<SubSystems>(
    platformName: string,
    ...systems: SubSystems extends ConstructorComposition<
      infer SubSystemConstructor
    >[]
      ? SubSystemConstructor extends { new (...args: any[]): any }
        ? InstanceType<SubSystemConstructor> extends SubSystem
          ? SubSystems
          : never
        : never
      : never
  ) {
    const platform = new Platform(platformName);
    for (const [subSystem, ...params] of systems) {
      const instance = new subSystem(...params);
      platform.link(subSystem, instance);
    }
  }

  #platform?: Platform;
}

class A1 extends SubSystem {
  constructor(public a: string) {
    super();
  }
}
class A2 extends SubSystem {}
class A3 {}

const a = SubSystem.compose(A1, "hello");
const b: Debug<typeof a> = new A1("hello");

SubSystem.createPlatform(
  "default",
  ...[
    SubSystem.compose(A1, "hello"),
    SubSystem.compose(A2),
    // SubSystem.compose(A3), // Error
  ]
);
