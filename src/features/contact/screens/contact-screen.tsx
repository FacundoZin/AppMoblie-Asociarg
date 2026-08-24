import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen, SectionTitle, Text, FadeInUp, EmptyState } from '@/components';
import { MessageCircle, Phone, MapPin } from 'lucide-react-native';
import { spacing, useTheme } from '@/theme';
import { useContact } from '../hooks';
import { ClubInfoCard, QuickAction, ScheduleCard } from '../components';

export function ContactScreen() {
  const { colors } = useTheme();
  const { club, isLoading, openWhatsApp, openPhone, openMaps } = useContact();

  if (isLoading) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <SectionTitle title="Contacto" />
          <View style={styles.loadingContainer}>
            <Text variant="sm" color={colors.textSecondary}>
              Cargando información del club...
            </Text>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  if (!club) {
    return (
      <Screen>
        <EmptyState
          title="Sin información"
          description="No pudimos cargar los datos del club"
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Contacto" />

        <FadeInUp delay={50}>
          <View style={styles.headerMessage}>
            <Text variant="sm" color={colors.textSecondary}>
              ¿Cómo podemos ayudarte?
            </Text>
          </View>
        </FadeInUp>

        <FadeInUp delay={100}>
          <ClubInfoCard club={club} />
        </FadeInUp>

        <View style={styles.actionsContainer}>
          <FadeInUp delay={150}>
            <QuickAction
              icon={MessageCircle}
              label="Enviar WhatsApp"
              description="Respuesta inmediata"
              color={colors.success}
              bgColor={colors.successLight}
              onPress={openWhatsApp}
            />
          </FadeInUp>

          <FadeInUp delay={200}>
            <QuickAction
              icon={Phone}
              label="Llamar al club"
              description={club.phone}
              color={colors.primary}
              bgColor={colors.primaryLight}
              onPress={openPhone}
            />
          </FadeInUp>

          <FadeInUp delay={250}>
            <QuickAction
              icon={MapPin}
              label="Ver ubicación"
              description="Abrir en Maps"
              color={colors.info}
              bgColor={colors.infoLight}
              onPress={openMaps}
            />
          </FadeInUp>
        </View>

        <FadeInUp delay={400}>
          <ScheduleCard schedule={club.schedule} />
        </FadeInUp>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
  headerMessage: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.sm,
  },
  actionsContainer: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  loadingContainer: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
});