# API Integration Skill


Cuando exista backend:


Toda comunicación debe vivir en:

src/services/
o
src/features/[feature]/services/


Nunca:

axios dentro de componentes.


Usar:

services
hooks
TanStack Query


Separar:

request
response
types
estado de carga
errores