import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { LucideIcon } from 'lucide-react-native';
import { shape, spacing } from '@/theme';
import { useTheme } from '@/theme';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
}

export function QuickActionButton({ icon, label, onPress }: QuickActionButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.secondaryContainer },
        ]}
      >
        <Icon name={icon} size={24} color={colors.onSecondaryContainer} />
      </View>
      <Text variant="labelMedium" color={colors.onSecondaryContainer} style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: shape.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    textAlign: 'center',
  },
});
