import type { ReactNode } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from './text';
import { spacing, useTheme } from '@/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  /** Optional element rendered at the trailing edge (e.g. avatar, action). */
  trailing?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Unified section header for tab screens. Every top-level section uses this
 * so typography and spacing stay consistent across the app (MD3 headline
 * role for the title, body role for the optional subtitle).
 */
export function ScreenHeader({ title, subtitle, trailing, style }: ScreenHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Text variant="headlineSmall" color={colors.onSurface}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="bodyMedium" color={colors.onSurfaceVariant} style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  trailing: {
    marginLeft: spacing.md,
  },
});
