import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen, Text } from '@/components';
import { lightColors, spacing } from '@/theme';

export default function PaymentDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="lg" weight="semibold" color={lightColors.textPrimary}>
          Detalle de cuota
        </Text>
        <Text variant="sm" color={lightColors.textSecondary} style={styles.idText}>
          ID: {id}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.base,
  },
  idText: {
    marginTop: spacing.sm,
  },
});