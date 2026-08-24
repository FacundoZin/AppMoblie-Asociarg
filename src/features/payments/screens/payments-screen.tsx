import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen, SectionTitle, Chip, FadeInUp, EmptyState, SearchBar, Skeleton } from '@/components';
import { PaymentSummaryCard, PaymentCard } from '../components';
import { usePayments } from '../hooks';
import { spacing } from '@/theme';
import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react-native';
import { PaymentStatus } from '../types';

type FilterType = 'all' | PaymentStatus;

const paymentStatusLabels: Record<PaymentStatus, string> = {
  pending: 'pendiente',
  paid: 'pagada',
  overdue: 'vencida',
};

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export function PaymentsScreen() {
  const { data: payments, isLoading, error } = usePayments();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');

  if (isLoading) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <SectionTitle title="Cuotas" />
          <View style={styles.list}>
            {[0, 1, 2].map((index) => (
              <Skeleton key={index} height={96} style={styles.skeletonCard} />
            ))}
          </View>
        </ScrollView>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <EmptyState
          icon={AlertCircle}
          title="Sin cuotas"
          description="No pudimos cargar tus cuotas"
        />
      </Screen>
    );
  }

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

  const filteredPayments = getFilteredPayments().filter((payment) => {
    const normalizedQuery = normalizeText(query.trim());
    if (!normalizedQuery) return true;
    const searchableText = `${paymentStatusLabels[payment.status]} ${payment.dueDate} ${payment.amount}`;
    return normalizeText(searchableText).includes(normalizedQuery);
  });

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

        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar cuota"
          style={styles.searchBar}
        />

        <FadeInUp delay={200}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
          >
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
          </ScrollView>
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
    paddingBottom: spacing['5xl'] + spacing.lg,
  },
  searchBar: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  chipsContainer: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.base,
  },
  skeletonCard: {
    marginBottom: spacing.md,
  },
});