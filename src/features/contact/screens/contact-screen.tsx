import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionTitle, Text, FadeInUp, EmptyState } from '@/components';
import { MessageCircle, Phone, Clock, MapPin } from 'lucide-react-native';
import { lightColors, spacing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContact } from '../hooks';
import { ClubInfoCard, QuickAction, ScheduleCard } from '../components';

export function ContactScreen() {
  const insets = useSafeAreaInsets();
  const { club, isLoading, openWhatsApp, openPhone, openMaps } = useContact();

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <SectionTitle title="Contacto" />
          <View style={styles.loadingContainer}>
            <Text variant="sm" color={lightColors.textSecondary}>
              Cargando información del club...
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!club) {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        <EmptyState
          title="Sin información"
          description="No pudimos cargar los datos del club"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Contacto" />

        <FadeInUp delay={50}>
          <View style={styles.headerMessage}>
            <Text variant="sm" color={lightColors.textSecondary}>
              ¿Cómo podemos ayudarte?
            </Text>
          </View>
        </FadeInUp>

        <ClubInfoCard club={club} />

        <View style={styles.actionsContainer}>
          <FadeInUp delay={150}>
            <QuickAction
              icon={MessageCircle}
              label="Enviar WhatsApp"
              description="Respuesta inmediata"
              color={lightColors.success}
              bgColor="#E8F8E7"
              onPress={openWhatsApp}
              delay={150}
            />
          </FadeInUp>

          <FadeInUp delay={200}>
            <QuickAction
              icon={Phone}
              label="Llamar al club"
              description={club.phone}
              color={lightColors.primary}
              bgColor={lightColors.primaryLight}
              onPress={openPhone}
              delay={200}
            />
          </FadeInUp>

          <FadeInUp delay={250}>
            <QuickAction
              icon={MapPin}
              label="Ver ubicación"
              description="Abrir en Maps"
              color={lightColors.info}
              bgColor="#E8F4FD"
              onPress={openMaps}
              delay={250}
            />
          </FadeInUp>
        </View>

        <ScheduleCard schedule={club.schedule} />
      </ScrollView>
    </SafeAreaView>
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
