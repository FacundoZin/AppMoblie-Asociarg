import { Stack } from 'expo-router';

export default function PagosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Cuotas',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalle de cuota',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
