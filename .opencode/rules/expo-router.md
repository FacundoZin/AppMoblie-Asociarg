# Expo Router Rules


app/

solo contiene rutas.


Ejemplo:

app/(tabs)/pagos/index.tsx


Debe consumir:

src/features/payments/screens/


Correcto:

import { PaymentsScreen } from "@/features/payments";


Incorrecto:

Crear componentes dentro de app/


Incorrecto:

Hacer llamadas API desde rutas.


La navegación debe permanecer separada del negocio.