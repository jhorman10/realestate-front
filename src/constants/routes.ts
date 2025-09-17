// Route constants for type-safe navigation
export const ROUTE_PATHS = {
  HOME: '/',
  PROPERTIES: {
    LIST: '/properties',
    CREATE: '/properties/create',
    DETAIL: '/properties/:id',
    EDIT: '/properties/:id/edit',
  },
} as const;

// Helper functions to generate dynamic routes
export const generateRoutes = {
  propertyDetail: (id: string) => `/properties/${id}`,
  propertyEdit: (id: string) => `/properties/${id}/edit`,
} as const;

// Navigation helper for programmatic navigation
export const navigationHelpers = {
  goToProperties: () => ROUTE_PATHS.PROPERTIES.LIST,
  goToPropertyDetail: (id: string) => generateRoutes.propertyDetail(id),
  goToPropertyEdit: (id: string) => generateRoutes.propertyEdit(id),
  goToCreateProperty: () => ROUTE_PATHS.PROPERTIES.CREATE,
  goHome: () => ROUTE_PATHS.HOME,
} as const;

export default ROUTE_PATHS;