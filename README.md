# 🏠 Real Estate Frontend

Una aplicación moderna de gestión de propiedades inmobiliarias construida con React 19, TypeScript y Tailwind CSS v4.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.0.0
- Yarn >= 1.22.0

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/jhorman10/realestate-front.git
cd realestate-frontend
```

2. **Instalar dependencias**
```bash
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar el archivo `.env` con tu configuración:
```bash
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
VITE_API_RETRY_ATTEMPTS=3

# Application Configuration
VITE_APP_NAME="Real Estate App"
VITE_APP_VERSION="1.0.0"
VITE_LOG_LEVEL=debug
```

4. **Iniciar el servidor de desarrollo**
```bash
yarn dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
yarn dev              # Inicia el servidor de desarrollo

# Construcción
yarn build            # Construye la aplicación para producción
yarn preview          # Vista previa de la build de producción

# Calidad de código
yarn lint             # Ejecuta ESLint
```

## ✨ Características

- 🎨 **Dark Mode** - Tema claro/oscuro con persistencia
- 📱 **Responsive** - Diseño adaptable a todos los dispositivos
- ⚡ **Performance** - Optimizado con Vite y React Query
- 🔐 **Validación** - Formularios con React Hook Form + Zod
- 🎯 **TypeScript** - Tipado estático completo
- 🎨 **Tailwind CSS** - Estilos utility-first modernos

## 🏗️ Stack Tecnológico

- **React 19** - Biblioteca principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y servidor de desarrollo
- **Tailwind CSS v4** - Framework CSS
- **Redux Toolkit** - Gestión de estado
- **React Query** - Manejo de datos del servidor
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas

## 📁 Estructura Principal

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas de la aplicación
├── hooks/              # Custom hooks
├── services/           # Servicios de API
├── store/              # Estado global (Redux)
├── schemas/            # Validación (Zod)
└── types/              # Tipos TypeScript
```

## 🔧 Configuración

### Backend

Asegúrate de que tu backend esté corriendo en `http://localhost:5000` o actualiza la variable `VITE_API_BASE_URL` en el archivo `.env`.

### Dark Mode

El tema se detecta automáticamente del sistema y se persiste en localStorage. Puedes cambiar manualmente usando el botón en la navegación.

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Jhorman Orozco**
- GitHub: [@jhorman10](https://github.com/jhorman10)
