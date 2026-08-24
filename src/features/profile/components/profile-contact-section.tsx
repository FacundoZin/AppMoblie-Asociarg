import { View, StyleSheet } from 'react-native';
import { SectionTitle, Text } from '@/components';
import { MessageCircle, Phone, MapPin } from 'lucide-react-native';
import { lightColors, spacing } from '@/theme';
import { ClubInfoCard, QuickAction, ScheduleCard, useContact } from '@/features/contact';

export function ProfileContactSection() {
  const { club, isLoading, openWhatsApp, openPhone, openMaps } = useContact();

  return (
    <View>
      <SectionTitle title="Contacto del club" />

      {isLoading && (
        <Text variant="sm" color={lightColors.textSecondary} style={styles.message}>
          Cargando información del club...
        </Text>
      )}

      {!isLoading && !club && (
        <Text variant="sm" color={lightColors.textSecondary} style={styles.message}>
          No pudimos cargar los datos del club
        </Text>
      )}

      {!isLoading && club && (
        <View style={styles.content}>
          <ClubInfoCard club={club} />

          <View style={styles.actionsContainer}>
            <QuickAction
              icon={MessageCircle}
              label="Enviar WhatsApp"
              description="Respuesta inmediata"
              color={lightColors.success}
              bgColor={lightColors.successLight}
              onPress={openWhatsApp}
            />

            <QuickAction
              icon={Phone}
              label="Llamar al club"
              description={club.phone}
              color={lightColors.primary}
              bgColor={lightColors.primaryLight}
              onPress={openPhone}
            />

            <QuickAction
              icon={MapPin}
              label="Ver ubicación"
              description="Abrir en Maps"
              color={lightColors.info}
              bgColor={lightColors.infoLight}
              onPress={openMaps}
            />
          </View>

          <ScheduleCard schedule={club.schedule} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  content: {
    marginTop: spacing.xs,
  },
  actionsContainer: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
});
