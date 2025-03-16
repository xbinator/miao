import type { App } from 'vue';
import * as components from './components';

export * from './components';

function installComponents(app: App) {
  Object.keys(components).forEach((key) => {
    const component = components[key];

    if (component.install) {
      app.use(component);
    }
  });

  return app;
}

export default { install: installComponents };
