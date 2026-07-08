import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { LucideIcon } from 'lucide-react-native';
import { lightColors, spacing, radii, shadows } from '@/theme';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
}

export function QuickActionButton({ icon, label, onPress }: QuickActionButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, shadows.sm]}>
        <Icon name={icon} size={24} color={lightColors.primary} />
      </View>
      <Text variant="xs" weight="medium" color={lightColors.textPrimary} style={styles.label}>
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
    borderRadius: radii.lg,
    backgroundColor: lightColors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    textAlign: 'center',
  },
});
