export interface PluginSubstrate {
  find: {
    <
      T extends PluginComponent,
      ComponentConstructor extends { new (...args: any): T }
    >(
      component: ComponentConstructor
    ): InstanceType<ComponentConstructor> | null;
  };

  require: {
    <
      T extends PluginComponent,
      ComponentConstructor extends { new (...args: any): T }
    >(
      component: ComponentConstructor
    ): InstanceType<ComponentConstructor>;
  }
}

export interface PluginComponent {
  get context(): PluginSubstrate;
}
