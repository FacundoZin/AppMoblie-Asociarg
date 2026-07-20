import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SectionTitle, Chip, Text, FadeInUp, EmptyState } from '@/components';
import { PaymentSummaryCard, PaymentCard } from '../components';
import { mockPayments } from '../hooks';
import { lightColors, spacing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react-native';

type FilterType = 'all' | 'pending' | 'paid' | 'overdue';

export function PaymentsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const pendingPayments = mockPayments.filter((p) => p.status === 'pending');
  const paidPayments = mockPayments.filter((p) => p.status === 'paid');
  const overduePayments = mockPayments.filter((p) => p.status === 'overdue');
  const totalPending = [...pendingPayments, ...overduePayments].reduce((sum, p) => sum + p.amount, 0);

  const getFilteredPayments = () => {
    switch (activeFilter) {
      case 'pending':
        return pendingPayments;
      case 'paid':
        return paidPayments;
      case 'overdue':
        return overduePayments;
      default:
        return mockPayments;
    }
  };

  const filteredPayments = getFilteredPayments();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Cuotas" />

      <PaymentSummaryCard
        totalPending={totalPending}
        pendingCount={pendingPayments.length}
        paidCount={paidPayments.length}
        overdueCount={overduePayments.length}
      />

      <FadeInUp delay={200}>
        <View style={styles.chipsContainer}>
          <Chip
            icon={CreditCard}
            label="Todas"
            selected={activeFilter === 'all'}
            onPress={() => setActiveFilter('all')}
            count={mockPayments.length}
          />
          <Chip
            icon={Clock}
            label="Pendientes"
            selected={activeFilter === 'pending'}
            onPress={() => setActiveFilter('pending')}
            count={pendingPayments.length}
          />
          <Chip
            icon={CheckCircle}
            label="Pagadas"
            selected={activeFilter === 'paid'}
            onPress={() => setActiveFilter('paid')}
            count={paidPayments.length}
          />
          <Chip
            icon={AlertCircle}
            label="Vencidas"
            selected={activeFilter === 'overdue'}
            onPress={() => setActiveFilter('overdue')}
            count={overduePayments.length}
          />
        </View>
      </FadeInUp>

      {filteredPayments.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="Sin cuotas"
          description="No hay cuotas en esta categoría"
        />
      ) : (
        <View style={styles.list}>
          {filteredPayments.map((payment, index) => (
            <FadeInUp key={payment.id} delay={300 + index * 100}>
              <PaymentCard payment={payment} />
            </FadeInUp>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  content: {
    flexGrow: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  list: {
    paddingHorizontal: spacing.base,
  },
});
