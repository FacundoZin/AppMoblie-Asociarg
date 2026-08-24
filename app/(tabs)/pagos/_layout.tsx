import { Stack } from 'expo-router';

export default function PagosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Cuotas',
          // The screen draws its own ScreenHeader; a native header would duplicate it.
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalle de cuota',
          // The detail screen renders the shared TopAppBar instead.
          headerShown: false,
        }}
      />
    </Stack>
  );
}
