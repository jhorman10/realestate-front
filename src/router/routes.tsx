import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PropertyListPage from '../pages/properties/PropertyListPage';
import PropertyDetailPage from '../pages/properties/PropertyDetailPage';
import CreatePropertyPage from '../pages/properties/CreatePropertyPage';
import EditPropertyPage from '../pages/properties/EditPropertyPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import { PageWrapper } from '../components/ui/PageTransition';

// Wrapper para añadir transiciones a cada página
const PageWithTransition = ({ children }: { children: React.ReactNode }) => (
  <PageWrapper>{children}</PageWrapper>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PageWithTransition>
            <HomePage />
          </PageWithTransition>
        ),
      },
      {
        path: 'properties',
        children: [
          {
            index: true,
            element: (
              <PageWithTransition>
                <PropertyListPage />
              </PageWithTransition>
            ),
          },
          {
            path: 'create',
            element: (
              <PageWithTransition>
                <CreatePropertyPage />
              </PageWithTransition>
            ),
          },
          {
            path: ':id',
            element: (
              <PageWithTransition>
                <PropertyDetailPage />
              </PageWithTransition>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PageWithTransition>
                <EditPropertyPage />
              </PageWithTransition>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <PageWithTransition>
            <NotFoundPage />
          </PageWithTransition>
        ),
      },
    ],
  },
];

// Route paths for easy reference
export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: (id: string) => `/properties/${id}`,
  PROPERTY_CREATE: '/properties/create',
  PROPERTY_EDIT: (id: string) => `/properties/${id}/edit`,
} as const;

export default routes;