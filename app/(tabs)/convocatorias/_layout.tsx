import { Stack } from 'expo-router';

export default function ConvocatoriasLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Convocatorias',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalle de convocatoria',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
