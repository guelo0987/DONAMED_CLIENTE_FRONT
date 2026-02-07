# 🔧 DONAMED - Panel de Administración

> Guía de arquitectura y estructura para el desarrollo del panel administrativo

Este documento proporciona las instrucciones para crear el Panel de Administración siguiendo la misma arquitectura, estilos y dependencias del proyecto cliente de DONAMED.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#-requisitos-previos)
2. [Inicialización del Proyecto](#-inicialización-del-proyecto)
3. [Dependencias](#-dependencias)
4. [Estructura de Carpetas](#-estructura-de-carpetas)
5. [Archivos de Configuración](#-archivos-de-configuración)
6. [Sistema de Estilos](#-sistema-de-estilos)
7. [Convenciones de Código](#-convenciones-de-código)

---

## 🔧 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- Editor de código (recomendado: VS Code)

---

## 🚀 Inicialización del Proyecto

```bash
# Crear el proyecto con Vite + React + TypeScript
npx create-vite@latest donamed-admin --template react-ts

# Entrar al directorio
cd donamed-admin

# Instalar dependencias base
npm install
```

---

## 📦 Dependencias

### Dependencias de Producción

```json
{
  "dependencies": {
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.563.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.0",
    "tailwind-merge": "^3.4.0"
  }
}
```

### Dependencias de Desarrollo

```json
{
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.23",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^5.4.11"
  }
}
```

### Instalación de Dependencias

```bash
# Instalar dependencias de producción
npm install @radix-ui/react-label @radix-ui/react-slot class-variance-authority clsx lucide-react react-router-dom tailwind-merge

# Instalar dependencias de desarrollo
npm install -D autoprefixer postcss tailwindcss tailwindcss-animate @types/node

# Inicializar Tailwind CSS
npx tailwindcss init -p
```

---

## 📁 Estructura de Carpetas

```
donamed-admin/
├── 📄 index.html
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 vite.config.ts
├── 📄 tsconfig.json
├── 📄 tsconfig.app.json
├── 📄 tsconfig.node.json
├── 📄 tailwind.config.js
├── 📄 postcss.config.js
├── 📄 eslint.config.js
├── 📄 .gitignore
├── 📄 README.md
│
├── 📂 public/                          # Archivos estáticos públicos
│   └── 📄 (favicon, imágenes, etc.)
│
├── 📂 dist/                            # Build de producción (generado)
│
└── 📂 src/
    │
    ├── 📄 main.tsx                     # Punto de entrada de la aplicación
    ├── 📄 App.tsx                      # Componente principal con rutas
    ├── 📄 index.css                    # Estilos globales + Tailwind
    │
    ├── 📂 lib/                         # Utilidades y helpers
    │   └── 📄 utils.tsx                # Función cn() para clases
    │
    ├── 📂 components/                  # Componentes reutilizables
    │   │
    │   ├── 📂 ui/                      # Componentes UI base (botones, inputs, etc.)
    │   │   ├── 📄 button.tsx
    │   │   ├── 📄 input.tsx
    │   │   ├── 📄 label.tsx
    │   │   ├── 📄 card.tsx
    │   │   ├── 📄 table.tsx
    │   │   ├── 📄 modal.tsx
    │   │   ├── 📄 dropdown.tsx
    │   │   ├── 📄 badge.tsx
    │   │   ├── 📄 alert.tsx
    │   │   └── 📄 ...
    │   │
    │   ├── 📂 layout/                  # Componentes de estructura
    │   │   ├── 📄 AdminLayout.tsx      # Layout principal del admin
    │   │   ├── 📄 Sidebar.tsx          # Barra lateral de navegación
    │   │   ├── 📄 Header.tsx           # Header del panel admin
    │   │   └── 📄 Footer.tsx           # Footer del panel admin
    │   │
    │   ├── 📂 dashboard/               # Componentes específicos del dashboard
    │   │   ├── 📄 StatsCard.tsx
    │   │   ├── 📄 RecentActivity.tsx
    │   │   ├── 📄 Charts.tsx
    │   │   └── 📄 ...
    │   │
    │   └── 📂 shared/                  # Componentes compartidos
    │       ├── 📄 DataTable.tsx
    │       ├── 📄 SearchInput.tsx
    │       ├── 📄 Pagination.tsx
    │       ├── 📄 ConfirmDialog.tsx
    │       └── 📄 ...
    │
    ├── 📂 Pages/                       # Páginas de la aplicación
    │   │
    │   ├── 📂 Auth/                    # Autenticación admin
    │   │   ├── 📄 AdminLogin.tsx
    │   │   ├── 📄 ForgotPassword.tsx
    │   │   └── 📄 ResetPassword.tsx
    │   │
    │   ├── 📂 Dashboard/               # Panel principal
    │   │   └── 📄 Dashboard.tsx
    │   │
    │   ├── 📂 Solicitudes/             # Gestión de solicitudes
    │   │   ├── 📄 ListaSolicitudes.tsx
    │   │   ├── 📄 DetalleSolicitud.tsx
    │   │   └── 📄 ProcesamientoSolicitud.tsx
    │   │
    │   ├── 📂 Usuarios/                # Gestión de usuarios/pacientes
    │   │   ├── 📄 ListaUsuarios.tsx
    │   │   ├── 📄 DetalleUsuario.tsx
    │   │   └── 📄 EditarUsuario.tsx
    │   │
    │   ├── 📂 Medicamentos/            # Gestión del catálogo
    │   │   ├── 📄 ListaMedicamentos.tsx
    │   │   ├── 📄 CrearMedicamento.tsx
    │   │   ├── 📄 EditarMedicamento.tsx
    │   │   └── 📄 Categorias.tsx
    │   │
    │   ├── 📂 Reportes/                # Reportes y estadísticas
    │   │   ├── 📄 ReporteSolicitudes.tsx
    │   │   ├── 📄 ReporteUsuarios.tsx
    │   │   └── 📄 ReporteMedicamentos.tsx
    │   │
    │   ├── 📂 Configuracion/           # Configuración del sistema
    │   │   ├── 📄 ConfigGeneral.tsx
    │   │   ├── 📄 Notificaciones.tsx
    │   │   └── 📄 PerfilAdmin.tsx
    │   │
    │   └── 📂 Ayuda/                   # Gestión de FAQ y soporte
    │       ├── 📄 PreguntasFrecuentes.tsx
    │       └── 📄 MensajesContacto.tsx
    │
    ├── 📂 hooks/                       # Custom hooks
    │   ├── 📄 useAuth.ts
    │   ├── 📄 useFetch.ts
    │   ├── 📄 useDebounce.ts
    │   └── 📄 ...
    │
    ├── 📂 services/                    # Servicios y API calls
    │   ├── 📄 api.ts                   # Configuración base de API
    │   ├── 📄 authService.ts
    │   ├── 📄 solicitudesService.ts
    │   ├── 📄 usuariosService.ts
    │   ├── 📄 medicamentosService.ts
    │   └── 📄 ...
    │
    ├── 📂 types/                       # Definiciones de TypeScript
    │   ├── 📄 index.ts
    │   ├── 📄 auth.types.ts
    │   ├── 📄 solicitud.types.ts
    │   ├── 📄 usuario.types.ts
    │   ├── 📄 medicamento.types.ts
    │   └── 📄 ...
    │
    ├── 📂 context/                     # Contextos de React
    │   ├── 📄 AuthContext.tsx
    │   ├── 📄 ThemeContext.tsx
    │   └── 📄 ...
    │
    ├── 📂 constants/                   # Constantes de la aplicación
    │   ├── 📄 routes.ts
    │   ├── 📄 menuItems.ts
    │   └── 📄 config.ts
    │
    └── 📂 utils/                       # Funciones utilitarias
        ├── 📄 formatters.ts
        ├── 📄 validators.ts
        └── 📄 helpers.ts
```

---

## ⚙️ Archivos de Configuración

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### `tsconfig.json`

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                // Colores adicionales para admin
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))'
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))'
                },
                info: {
                    DEFAULT: 'hsl(var(--info))',
                    foreground: 'hsl(var(--info-foreground))'
                }
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}
```

### `postcss.config.js`

```javascript
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}
```

---

## 🎨 Sistema de Estilos

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    
    /* Colores adicionales para admin */
    --success: 142 76% 36%;
    --success-foreground: 210 40% 98%;
    --warning: 38 92% 50%;
    --warning-foreground: 222.2 47.4% 11.2%;
    --info: 199 89% 48%;
    --info-foreground: 210 40% 98%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    
    /* Colores adicionales para admin - dark mode */
    --success: 142 70% 45%;
    --success-foreground: 210 40% 98%;
    --warning: 38 92% 50%;
    --warning-foreground: 222.2 47.4% 11.2%;
    --info: 199 89% 48%;
    --info-foreground: 210 40% 98%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html,
  body,
  * {
    font-family: 'Poppins', sans-serif !important;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

### `src/lib/utils.tsx`

```tsx
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

---

## 📝 Convenciones de Código

### Nombrado de Archivos

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes React | PascalCase | `AdminLayout.tsx` |
| Hooks | camelCase con prefijo `use` | `useAuth.ts` |
| Servicios | camelCase con sufijo `Service` | `authService.ts` |
| Types | camelCase con sufijo `.types` | `usuario.types.ts` |
| Utilidades | camelCase | `formatters.ts` |
| Constantes | camelCase | `routes.ts` |

### Estructura de Componentes

```tsx
// 1. Imports externos
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Imports internos (components, hooks, utils)
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

// 3. Imports de tipos
import type { User } from '@/types/usuario.types';

// 4. Interface/Types del componente
interface ComponentProps {
  data: User;
  onSubmit: () => void;
}

// 5. Componente
export const Component = ({ data, onSubmit }: ComponentProps) => {
  // Estados
  const [loading, setLoading] = useState(false);
  
  // Hooks
  const navigate = useNavigate();
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div>
      {/* ... */}
    </div>
  );
};
```

### Carpeta de Exports (`index.ts`)

Para carpetas con múltiples componentes, crear un archivo `index.ts` para centralizar exports:

```typescript
// src/components/landing/index.ts
export { AssistanceSection } from './AssistanceSection';
export { HeroSection } from './HeroSection';
export { MedicationsSection } from './MedicationsSection';
export { PartnersSection } from './PartnersSection';
```

---

## 🖼️ Iconografía

Se utiliza **Lucide React** como librería de iconos:

```tsx
import { Home, Users, FileText, Settings, LogOut } from 'lucide-react';
```

---

## 🔗 Rutas Sugeridas para el Admin

```tsx
// src/App.tsx
const router = createBrowserRouter([
    // Auth
    { path: "/login", element: <AdminLogin /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    
    // Dashboard
    { path: "/", element: <Dashboard /> },
    { path: "/dashboard", element: <Dashboard /> },
    
    // Solicitudes
    { path: "/solicitudes", element: <ListaSolicitudes /> },
    { path: "/solicitudes/:id", element: <DetalleSolicitud /> },
    
    // Usuarios
    { path: "/usuarios", element: <ListaUsuarios /> },
    { path: "/usuarios/:id", element: <DetalleUsuario /> },
    
    // Medicamentos
    { path: "/medicamentos", element: <ListaMedicamentos /> },
    { path: "/medicamentos/crear", element: <CrearMedicamento /> },
    { path: "/medicamentos/:id/editar", element: <EditarMedicamento /> },
    { path: "/medicamentos/categorias", element: <Categorias /> },
    
    // Reportes
    { path: "/reportes/solicitudes", element: <ReporteSolicitudes /> },
    { path: "/reportes/usuarios", element: <ReporteUsuarios /> },
    { path: "/reportes/medicamentos", element: <ReporteMedicamentos /> },
    
    // Configuración
    { path: "/configuracion", element: <ConfigGeneral /> },
    { path: "/configuracion/notificaciones", element: <Notificaciones /> },
    { path: "/perfil", element: <PerfilAdmin /> },
    
    // Ayuda
    { path: "/ayuda/faq", element: <PreguntasFrecuentes /> },
    { path: "/ayuda/mensajes", element: <MensajesContacto /> },
]);
```

---

## 🚀 Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 📱 Consideraciones Responsive

Utilizar los breakpoints de Tailwind CSS:

| Prefijo | Min Width | Dispositivo |
|---------|-----------|-------------|
| `sm:` | 640px | Móviles grandes |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Monitores grandes |

---

## ✅ Checklist de Inicio

- [ ] Crear proyecto con Vite
- [ ] Instalar todas las dependencias
- [ ] Configurar Tailwind CSS
- [ ] Crear estructura de carpetas
- [ ] Copiar archivos de configuración
- [ ] Configurar `index.css` con variables CSS
- [ ] Crear utility `cn()` en `lib/utils.tsx`
- [ ] Configurar React Router
- [ ] Crear layout principal del admin
- [ ] ¡Empezar a desarrollar! 🎉

---

## 📚 Recursos Adicionales

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/en/main)
- [Lucide Icons](https://lucide.dev/icons)
- [Radix UI](https://www.radix-ui.com/)
- [Vite Docs](https://vitejs.dev/)

---

> **Nota:** Este README fue generado para mantener coherencia entre el proyecto cliente y el panel de administración de DONAMED.
