import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { shape, spacing, typeRoles } from '@/theme';
import { useTheme } from '@/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar',
  style,
}: SearchBarProps) {
  const { colors } = useTheme();
  const showClear = value.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceContainerHigh }, style]}>
      <Search size={22} color={colors.onSurfaceVariant} />
      <TextInput
        style={[styles.input, { color: colors.onSurface }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceVariant}
        accessibilityRole="search"
        returnKeyType="search"
      />
      {showClear && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Limpiar búsqueda"
          onPress={() => onChangeText('')}
          hitSlop={4}
          style={({ pressed }) => [styles.clearButton, pressed && styles.clearPressed]}
        >
          <X size={18} color={colors.onSurfaceVariant} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: shape.full,
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    ...typeRoles.bodyLarge,
    paddingVertical: 0,
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: shape.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearPressed: {
    opacity: 0.6,
  },
});
