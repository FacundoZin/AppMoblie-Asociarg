import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen, SectionTitle, Chip, FadeInUp, EmptyState } from '@/components';
import { PaymentSummaryCard, PaymentCard } from '../components';
import { usePayments } from '../hooks';
import { spacing } from '@/theme';
import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react-native';
import { PaymentStatus } from '../types';

type FilterType = 'all' | PaymentStatus;

export function PaymentsScreen() {
  const { data: payments } = usePayments();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const paidPayments = payments.filter((p) => p.status === 'paid');
  const overduePayments = payments.filter((p) => p.status === 'overdue');
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
        return payments;
    }
  };

  const filteredPayments = getFilteredPayments();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Cuotas" />

        <FadeInUp delay={100}>
          <PaymentSummaryCard
            totalPending={totalPending}
            pendingCount={pendingPayments.length}
            paidCount={paidPayments.length}
            overdueCount={overduePayments.length}
          />
        </FadeInUp>

        <FadeInUp delay={200}>
          <View style={styles.chipsContainer}>
            <Chip
              icon={CreditCard}
              label="Todas"
              selected={activeFilter === 'all'}
              onPress={() => setActiveFilter('all')}
              count={payments.length}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
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