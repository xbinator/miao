import type { App, Component } from 'vue';

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & { install(app: App): void } & EventShim;

export function withInstall<T extends Component>(name: string, options: T) {
  (options as Record<string, unknown>).install = (app: App) => {
    const _name = `M${name}`;

    app.component(_name, options);
  };

  return options as WithInstall<T>;
}
