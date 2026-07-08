import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { fontSize, fontWeight, lightColors, spacing } from '@/theme';

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: fontSize.lg, fontWeight: fontWeight.semibold }}>
        Pantalla no encontrada
      </Text>
      <Link href="/" style={{ marginTop: spacing.base, color: lightColors.primary }}>
        Ir al inicio
      </Link>
    </View>
  );
}
