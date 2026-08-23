import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Screen, Text } from '@/components';
import { lightColors, spacing } from '@/theme';

export default function NotFoundScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="lg" weight="semibold" color={lightColors.textPrimary}>
          Pantalla no encontrada
        </Text>
        <Link href="/" style={styles.link}>
          <Text variant="sm" color={lightColors.primary}>
            Ir al inicio
          </Text>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginTop: spacing.base,
  },
});