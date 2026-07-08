import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SectionTitle } from '@/components';
import { PaymentCard } from '../components';
import { mockPayments } from '../hooks';
import { lightColors, spacing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function PaymentsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Cuotas" />
      {mockPayments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  content: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.md,
    flexGrow: 1,
  },
});
