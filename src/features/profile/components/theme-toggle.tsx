import { View, StyleSheet } from 'react-native';
import { Chip } from '@/components';
import { spacing, useTheme, type ThemeMode } from '@/theme';

const OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'Sistema' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
];

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <View style={styles.row}>
      {OPTIONS.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={mode === option.value}
          onPress={() => setMode(option.value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.base,
  },
});
