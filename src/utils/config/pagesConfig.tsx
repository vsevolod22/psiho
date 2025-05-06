import type { RouteObject } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { ServicesPage } from '@/pages/ServicesPage/ServicesPage';
import { ServiceDetailsPage } from '@/pages/ServiceDetailsPage/ServiceDetailsPage';
import { AboutPage } from '@/pages/AboutPage/AboutPage';
import { ExpressDiagnosticsPage } from '@/pages/ExpressDiagnosticsPage/ExpressDiagnosticsPage';

export enum AppRoutes {
   MAIN = 'main',
   SERVICES = 'services',
   SERVICE_DETAILS = 'service_details',
   ABOUT = 'about',
   EXPRESS_DIAGNOSTICS = 'express_diagnostics',
   NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
   [AppRoutes.MAIN]: '/',
   [AppRoutes.SERVICES]: '/services',
   [AppRoutes.SERVICE_DETAILS]: '/services/:id',
   [AppRoutes.ABOUT]: '/about',
   [AppRoutes.EXPRESS_DIAGNOSTICS]: '/express-diagnostics',
   [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
   [AppRoutes.MAIN]: {
      path: RoutePath.main,
      element: <MainPage />,
   },
   [AppRoutes.SERVICES]: {
      path: RoutePath.services,
      element: <ServicesPage />,
   },
   [AppRoutes.SERVICE_DETAILS]: {
      path: RoutePath.service_details,
      element: <ServiceDetailsPage />,
   },
   [AppRoutes.ABOUT]: {
      path: RoutePath.about,
      element: <AboutPage />,
   },
   [AppRoutes.EXPRESS_DIAGNOSTICS]: {
      path: RoutePath.express_diagnostics,
      element: <ExpressDiagnosticsPage />,
   },
   [AppRoutes.NOT_FOUND]: {
      path: RoutePath.not_found,
      element: <NotFoundPage />,
   },
};
