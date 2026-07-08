# Arquitectura Asociarg Mobile

El proyecto utiliza Feature Based Architecture.

La carpeta app/ pertenece exclusivamente a Expo Router.

No colocar:
- lógica de negocio
- llamadas API
- componentes complejos
- estados globales

dentro de app/.

Toda funcionalidad debe vivir dentro de:

src/features/[feature]/


Estructura obligatoria:

features/[feature]/

components/
screens/
hooks/
services/
types/
index.ts


Reglas de dependencia:

components/ui
        ↓
features components
        ↓
features screens
        ↓
app routes


Nunca invertir dependencias.

Los componentes genéricos no deben conocer reglas del negocio.