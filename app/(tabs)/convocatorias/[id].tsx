import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen, Text, TopAppBar } from '@/components';
import { lightColors, spacing } from '@/theme';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <Screen>
      <TopAppBar title="Detalle de convocatoria" fallbackHref="/convocatorias" />
      <View style={styles.container}>
        <Text variant="sm" color={lightColors.textSecondary}>
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
});

