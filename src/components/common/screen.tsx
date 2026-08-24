import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTheme, type Colors } from '@/theme';

interface ScreenProps {
  children: ReactNode;
  /** Theme color token for the screen background. Defaults to `background`. */
  backgroundColor?: keyof Colors;
  /** Safe-area edges to pad content for. Defaults to `['top', 'bottom']`. */
  edges?: Edge[];
}

/**
 * Shared screen scaffold: handles safe-area insets and the theme background so
 * feature screens never manage `SafeAreaView` or background colors themselves.
 */
export function Screen({
  children,
  backgroundColor = 'background',
  edges = ['top', 'bottom'],
}: ScreenProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[backgroundColor] }]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
