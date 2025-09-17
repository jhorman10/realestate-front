# 🏠 Real Estate Frontend# 🏠 Real Estate Frontend



> Una aplicación moderna de gestión de propiedades inmobiliarias construida con React 19, TypeScript, y Tailwind CSS v4.> Una aplicación moderna de gestión de propiedades inmobiliarias construida con React 19, TypeScript, y Tailwind CSS v4.



![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)

![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)



## ✨ Características Principales## ✨ Características Principales



- 🏗️ **Arquitectura Moderna**: React 19 + TypeScript + Vite- 🏗️ **Arquitectura Moderna**: React 19 + TypeScript + Vite

- 🎨 **UI/UX Premium**: Tailwind CSS v4 con dark mode completo- 🎨 **UI/UX Premium**: Tailwind CSS v4 con dark mode completo

- 🔄 **Estado Global**: Redux Toolkit + React Query para gestión óptima- 🔄 **Estado Global**: Redux Toolkit + React Query para gestión óptima

- 📱 **Responsive Design**: Mobile-first con transiciones fluidas- 📱 **Responsive Design**: Mobile-first con transiciones fluidas

- 🔐 **Validación Robusta**: React Hook Form + Zod schemas- 🔐 **Validación Robusta**: React Hook Form + Zod schemas

- 🚀 **Performance**: Cache inteligente y optimizaciones avanzadas- 🚀 **Performance**: Cache inteligente y optimizaciones avanzadas

- 🌙 **Dark Mode**: Tema claro/oscuro con persistencia- 🌙 **Dark Mode**: Tema claro/oscuro con persistencia

- ✨ **Transiciones**: Animaciones suaves en toda la aplicación- ✨ **Transiciones**: Animaciones suaves en toda la aplicación



## 🚀 Inicio Rápido## 🚀 Inicio Rápido



### Prerrequisitos### Prerrequisitos



```bash```bash

node >= 18.0.0node >= 18.0.0

yarn >= 1.22.0yarn >= 1.22.0

``````



### Instalación### Instalación



1. **Clonar el repositorio**1. **Clonar el repositorio**

```bash```bash

git clone <repository-url>git clone <repository-url>

cd realestate-frontendcd realestate-frontend

``````



2. **Instalar dependencias**2. **Instalar dependencias**

```bash```bash

yarn installyarn install

```

```

3. **Configurar variables de entorno**

```bashYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

cp .env.example .env

```3. **Configurar variables de entorno**



Editar `.env` con tu configuración:```bash```js

```bash

# Backend API Configurationcp .env.example .env// eslint.config.js

VITE_API_BASE_URL=http://localhost:5000

```import reactX from 'eslint-plugin-react-x'

# Development Configuration

VITE_DEV_MODE=trueimport reactDom from 'eslint-plugin-react-dom'

```

Editar `.env` con tu configuración:

4. **Iniciar el servidor de desarrollo**

```bash```bashexport default tseslint.config([

yarn dev

```# Backend API Configuration  globalIgnores(['dist']),



La aplicación estará disponible en `http://localhost:5173`VITE_API_BASE_URL=http://localhost:5000  {



## 📁 Estructura del ProyectoVITE_API_TIMEOUT=10000    files: ['**/*.{ts,tsx}'],



```VITE_API_RETRY_ATTEMPTS=3    extends: [

src/

├── components/          # Componentes reutilizables      // Other configs...

│   ├── forms/          # Formularios especializados

│   ├── layout/         # Componentes de layout# Application Configuration      // Enable lint rules for React

│   └── ui/             # Componentes UI básicos

├── hooks/              # Custom hooksVITE_APP_NAME=Real Estate App      reactX.configs['recommended-typescript'],

├── pages/              # Páginas de la aplicación

├── router/             # Configuración de rutasVITE_APP_VERSION=1.0.0      // Enable lint rules for React DOM

├── services/           # Servicios y APIs

├── store/              # Estado global (Redux)```      reactDom.configs.recommended,

├── types/              # Definiciones TypeScript

└── utils/              # Utilidades y helpers    ],

```

4. **Iniciar servidor de desarrollo**    languageOptions: {

## 🎯 Páginas Principales

```bash      parserOptions: {

- **🏠 Home**: Dashboard principal con estadísticas

- **📋 Lista de Propiedades**: Vista completa con filtros avanzadosnpm run dev        project: ['./tsconfig.node.json', './tsconfig.app.json'],

- **➕ Crear Propiedad**: Formulario completo de registro

- **✏️ Editar Propiedad**: Actualización de propiedades existentes```        tsconfigRootDir: import.meta.dirname,

- **👁️ Detalle de Propiedad**: Vista completa con información detallada

      },

## 🔧 Scripts Disponibles

5. **Abrir en el navegador**      // other options...

```bash

# Desarrollo```    },

yarn dev              # Inicia servidor de desarrollo

http://localhost:5173  },

# Construcción

yarn build            # Construye para producción```])

yarn preview          # Preview de la build de producción

```

# Calidad de código

yarn lint             # Ejecuta ESLint## 📁 Estructura del Proyecto

yarn lint:fix         # Corrige errores de ESLint automáticamente

yarn type-check       # Verifica tipos TypeScript```

src/

# Mantenimiento├── components/           # Componentes reutilizables

yarn clean            # Limpia archivos generados│   ├── forms/           # Formularios (PropertyForm, EditPropertyForm)

```│   ├── layout/          # Layout components (Navbar, Header, Layout)

│   └── ui/              # UI components (PageTransition, LoadingSpinner)

## 🛠️ Tecnologías Utilizadas├── constants/           # Constantes y configuración

│   └── routes.ts        # Rutas tipadas y helpers

### Core├── context/            # React Context providers

- **React 19**: Biblioteca principal con las últimas características│   └── ThemeContext.tsx # Gestión de tema claro/oscuro

- **TypeScript 5.8**: Tipado estático para mayor robustez├── hooks/              # Custom hooks

- **Vite 7**: Build tool ultra-rápido y optimizado│   ├── usePropertyApi.ts   # Hooks de API con React Query

│   ├── useProperties.ts    # Hooks legacy (compatibilidad)

### UI & Estilo│   └── useTransitions.ts   # Hooks para transiciones

- **Tailwind CSS v4**: Framework CSS utility-first├── pages/              # Páginas principales

- **Custom Transitions**: Sistema de transiciones personalizado│   ├── HomePage.tsx           # Página de inicio

- **Dark Mode**: Implementación completa con persistencia│   ├── NotFoundPage.tsx       # Página 404

│   └── properties/            # Páginas de propiedades

### Estado y Datos│       ├── PropertyListPage.tsx    # Lista de propiedades

- **Redux Toolkit**: Gestión de estado global simplificada│       ├── PropertyDetailPage.tsx  # Detalle de propiedad

- **React Query**: Cache inteligente y sincronización de datos│       ├── CreatePropertyPage.tsx  # Crear propiedad

- **React Hook Form**: Manejo eficiente de formularios│       └── EditPropertyPage.tsx    # Editar propiedad

- **Zod**: Validación de esquemas TypeScript-first├── router/             # Configuración de rutas

│   └── routes.tsx      # Definición de rutas con transiciones

### Routing y Navegación├── schemas/            # Validación con Zod

- **React Router v7**: Routing declarativo con lazy loading│   └── propertySchemas.ts # Schemas para propiedades

- **Page Transitions**: Transiciones fluidas entre páginas├── services/           # Servicios de API

│   ├── api.ts                # Cliente HTTP base

## 🎨 Sistema de Diseño│   ├── propertyApiService.ts # Servicio principal de propiedades

│   └── propertyService.ts    # Servicio legacy

### Colores├── store/              # Redux Toolkit store

```css│   ├── index.ts              # Configuración del store

/* Light Mode */│   └── slices/               # Redux slices

--primary: #3b82f6│       ├── propertySlice.ts  # Estado de propiedades

--secondary: #64748b│       └── uiSlice.ts        # Estado de UI (tema, notificaciones)

--accent: #10b981└── types/              # Definiciones de tipos TypeScript

--background: #ffffff    └── property.ts     # Tipos de propiedades

--foreground: #0f172a```



/* Dark Mode */## 🗺️ Rutas de la Aplicación

--primary: #60a5fa

--secondary: #94a3b8| Ruta | Componente | Descripción |

--accent: #34d399|------|------------|-------------|

--background: #0f172a| `/` | `HomePage` | Página de inicio con hero section |

--foreground: #f8fafc| `/properties` | `PropertyListPage` | Lista de propiedades con filtros |

```| `/properties/create` | `CreatePropertyPage` | Crear nueva propiedad |

| `/properties/:id` | `PropertyDetailPage` | Ver detalle de propiedad |

### Transiciones| `/properties/:id/edit` | `EditPropertyPage` | Editar propiedad |

- **Page Transitions**: Fade, slide, scale con timing optimizado| `*` | `NotFoundPage` | Página 404 |

- **Loading States**: Spinners y overlays con animaciones suaves

- **Hover Effects**: Transformaciones sutiles en componentes interactivos## 🎨 Sistema de Temas



## 📱 Responsive DesignLa aplicación incluye soporte completo para modo claro/oscuro:



- **Mobile First**: Diseño optimizado para dispositivos móviles### Configuración de Dark Mode

- **Breakpoints Tailwind**: `sm:` `md:` `lg:` `xl:` `2xl:`- **Activación**: Clase `.dark` en el elemento `<html>`

- **Touch Friendly**: Elementos táctiles con tamaños apropiados- **Persistencia**: LocalStorage automático

- **Performance**: Lazy loading y optimizaciones para móviles- **Transiciones**: Suaves entre temas

- **Tailwind v4**: Custom variant `@custom-variant dark (&:is(.dark *))`

## 🔐 Validación y Formularios

### Uso en Componentes

### Esquemas Zod```tsx

```typescriptimport { useTheme } from '../context/ThemeContext';

const propertySchema = z.object({

  title: z.string().min(1, "Título requerido"),const Component = () => {

  price: z.number().positive("Precio debe ser positivo"),  const { theme, toggleTheme } = useTheme();

  type: z.enum(["HOUSE", "APARTMENT", "LAND"]),  

  // ... más validaciones  return (

})    <button 

```      onClick={toggleTheme}

      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"

### Características    >

- **Validación en tiempo real**: Feedback inmediato al usuario      {theme === 'light' ? '🌙' : '☀️'}

- **Mensajes personalizados**: Errores claros y útiles    </button>

- **Integración TypeScript**: Tipos automáticos desde esquemas  );

};

## 🚀 Optimizaciones de Performance```



- **Lazy Loading**: Carga diferida de componentes y rutas## 🔄 Gestión de Estado

- **Code Splitting**: División automática del código

- **Image Optimization**: Carga eficiente de imágenes### Redux Toolkit + React Query

- **Cache Strategy**: Estrategias de cache para APIs

- **Bundle Analysis**: Análisis y optimización del bundle**Redux Toolkit** para estado de UI:

- Tema (claro/oscuro)

## 🌙 Dark Mode- Notificaciones

- Estado de sidebar

### Implementación

- **Tailwind CSS v4**: Configuración nativa con custom variant**React Query** para datos del servidor:

- **Context API**: Gestión global del tema- Cache inteligente (5 minutos stale time)

- **LocalStorage**: Persistencia de preferencias- Invalidación automática

- **System Preference**: Detección automática del tema del sistema- Optimistic updates

- Retry logic configurable

### Uso

```tsx### Ejemplo de Uso

const { theme, toggleTheme } = useTheme()```tsx

import { useProperties, useCreateProperty } from '../hooks/usePropertyApi';

// Toggle manual

<button onClick={toggleTheme}>const PropertyList = () => {

  {theme === 'dark' ? '☀️' : '🌙'}  const { data: properties, isLoading } = useProperties();

</button>  const createMutation = useCreateProperty();

```  

  const handleCreate = (propertyData) => {

## 📦 Gestión de Estado    createMutation.mutate(propertyData, {

      onSuccess: () => {

### Redux Store        // El cache se invalida automáticamente

```typescript        toast.success('Property created!');

// Estructura del store      }

interface RootState {    });

  properties: PropertyState  };

  ui: UIState};

}```

```

## 📋 Formularios y Validación

### React Query

- **Cache Management**: Cache automático con invalidación inteligente### React Hook Form + Zod

- **Background Updates**: Actualizaciones en segundo plano

- **Optimistic Updates**: Actualizaciones optimistas para UX fluidaValidación robusta con schemas tipados:



## 🔍 API Integration```tsx

import { useForm } from 'react-hook-form';

### Configuraciónimport { zodResolver } from '@hookform/resolvers/zod';

```typescriptimport { CreatePropertyRequestSchema } from '../schemas/propertySchemas';

// services/api.ts

const api = axios.create({const PropertyForm = () => {

  baseURL: import.meta.env.VITE_API_BASE_URL,  const {

  timeout: 10000,    register,

})    handleSubmit,

```    formState: { errors, isSubmitting }

  } = useForm({

### Endpoints    resolver: zodResolver(CreatePropertyRequestSchema)

- `GET /api/properties` - Lista de propiedades  });

- `POST /api/properties` - Crear propiedad  

- `PUT /api/properties/:id` - Actualizar propiedad  const onSubmit = async (data) => {

- `DELETE /api/properties/:id` - Eliminar propiedad    // Los datos están validados automáticamente

  };

## 🧪 Testing (Configuración futura)};

```

```bash

# Testing setup recommendation### Schemas Disponibles

yarn add -D @testing-library/react @testing-library/jest-dom vitest- `CreatePropertyRequestSchema` - Crear propiedad

```- `UpdatePropertyRequestSchema` - Actualizar propiedad

- `PropertyFilterRequestSchema` - Filtros de búsqueda

## 📈 Monitoreo y Analytics (Configuración futura)- `PropertySchema` - Propiedad completa

- `PropertyDetailSchema` - Detalle con traces

```bash

# Analytics setup recommendation## ✨ Transiciones y Animaciones

yarn add @vercel/analytics react-ga4

```### Sistema de Transiciones



## 🚀 Deployment**Componentes de Transición**:

- `PageTransition` - Transiciones entre páginas

### Build de Producción- `LoadingTransition` - Estados de loading

```bash- `PageWrapper` - Wrapper automático para páginas

yarn build

```**CSS Global**:

```css

### Configuración para Vercel* {

```json  transition: background-color 0.3s ease, 

{              color 0.3s ease, 

  "buildCommand": "yarn build",              border-color 0.3s ease, 

  "outputDirectory": "dist",              opacity 0.3s ease, 

  "framework": "vite"              transform 0.3s ease;

}}

``````



## 🤝 Contribución**Clases de Utilidad**:

- `.transition-page` - Animación de entrada

1. Fork el proyecto- `.transition-slide` - Deslizamiento lateral

2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)- `.transition-scale` - Escalado suave

3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)- `.loading-pulse` - Pulso de loading

4. Push a la rama (`git push origin feature/AmazingFeature`)

5. Abrir un Pull Request### Uso de Transiciones

```tsx

## 📄 Licenciaimport { PageWrapper } from '../components/ui/PageTransition';



Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.const MyPage = () => (

  <PageWrapper>

## 🙏 Agradecimientos    <div className="transition-scale">

      {/* Contenido con transición */}

- **React Team** por React 19 y sus nuevas características    </div>

- **Tailwind CSS** por el framework CSS v4  </PageWrapper>

- **Vite Team** por la herramienta de build ultra-rápida);

- **TypeScript Team** por el tipado estático robusto```



---## 🛠️ Scripts Disponibles



**Hecho con ❤️ y las últimas tecnologías web**```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (puerto 5173)

# Construcción
npm run build        # Build para producción
npm run preview      # Preview del build

# Calidad de código
npm run lint         # ESLint
```

## 🏗️ Tecnologías Utilizadas

### Core Framework
- **React 19.1.1** - UI Library con las últimas características
- **TypeScript 5.8.3** - Tipado estático
- **Vite 7.1.2** - Build tool ultrarrápido

### Routing & Estado
- **React Router 7.9.1** - Routing declarativo
- **Redux Toolkit 2.9.0** - Estado global
- **React Query 5.89.0** - Server state management

### Styling & UI
- **Tailwind CSS 4.1.13** - Utility-first CSS
- **Lucide React** - Iconos modernos
- **React Icons** - Conjunto de iconos
- **React Hot Toast** - Notificaciones

### Formularios & Validación
- **React Hook Form 7.62.0** - Gestión de formularios
- **Zod 4.1.8** - Schema validation
- **@hookform/resolvers** - Integración RHF + Zod

### HTTP & API
- **Axios 1.12.2** - Cliente HTTP
- **Custom API Layer** - Servicios tipados

## 🔧 Configuración de Desarrollo

### ESLint
```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    }
  }
];
```

### Tailwind CSS v4
```javascript
// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    }
  }
};
```

### PostCSS
```javascript
// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 768px` (1 columna)
- **Tablet**: `768px - 1024px` (2 columnas)
- **Desktop**: `> 1024px` (3 columnas)

### Características Responsive
- 📱 Navegación móvil con hamburguesa
- 🔄 Grid adaptativo para tarjetas
- 📋 Formularios que se apilan en móvil
- 👆 Touch targets optimizados

## 🚀 Performance

### Optimizaciones Implementadas
- ⚡ **Code Splitting** automático con Vite
- 🗄️ **Cache Strategy** inteligente con React Query
- 🔄 **Optimistic Updates** en mutaciones
- 📦 **Bundle Optimization** con tree shaking
- 🖼️ **Lazy Loading** de componentes pesados

### Métricas de Build
- **CSS**: 38.42 kB (gzipped: 7.43 kB)
- **JavaScript**: 505.98 kB (gzipped: 157.86 kB)
- **Build Time**: ~1.75s

## 🐛 Troubleshooting

### Problemas Comunes

**1. Error de CORS**
```bash
# Verificar que el backend esté corriendo en puerto 5000
# Actualizar VITE_API_BASE_URL en .env
```

**2. Dark Mode no funciona**
```bash
# Verificar que @custom-variant esté en index.css
# Comprobar que la clase .dark se aplique al html
```

**3. Rutas no funcionan**
```bash
# Verificar que el servidor soporte HTML5 history API
# En producción, configurar redirects a index.html
```

**4. TypeScript Errors**
```bash
# Limpiar cache de TypeScript
rm -rf node_modules/.cache
npm install
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch para feature (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Autor

**Jhorman Orozco**
- GitHub: [@jhormanorozco](https://github.com/jhormanorozco)

---

<div align="center">

**🏠 Real Estate Frontend** - Construido con ❤️ y las mejores prácticas de React

</div>