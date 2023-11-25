import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@bishub-energy/public-pages').then((m) => m.PublicPagesModule),
  },
];
