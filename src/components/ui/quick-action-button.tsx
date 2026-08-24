import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { LucideIcon } from 'lucide-react-native';
import { lightColors, shape, spacing } from '@/theme';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
}

export function QuickActionButton({ icon, label, onPress }: QuickActionButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color={lightColors.onSecondaryContainer} />
      </View>
      <Text variant="labelMedium" color={lightColors.onSecondaryContainer} style={styles.label}>
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
    backgroundColor: lightColors.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    textAlign: 'center',
  },
});
