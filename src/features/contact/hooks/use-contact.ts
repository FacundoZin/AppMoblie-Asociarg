import { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { ClubContact, ContactFormData } from '../types';
import { contactService } from '../services';

export function useContact() {
  const [club, setClub] = useState<ClubContact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    loadClubContact();
  }, []);

  const loadClubContact = async () => {
    try {
      setIsLoading(true);
      const data = await contactService.getClubContact();
      setClub(data);
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = async () => {
    if (!club) return;
    try {
      await Linking.openURL(`https://wa.me/${club.whatsapp}`);
    } catch {
      // WhatsApp no instalado
    }
  };

  const openPhone = async () => {
    if (!club) return;
    try {
      await Linking.openURL(`tel:${club.phone}`);
    } catch {
      // No se pudo abrir el marcador
    }
  };

  const openMaps = async () => {
    if (!club) return;
    try {
      await Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(club.address)}`);
    } catch {
      // No se pudo abrir Maps
    }
  };

  const sendContactForm = async (data: ContactFormData): Promise<boolean> => {
    try {
      setIsSending(true);
      const result = await contactService.sendContactForm(data);
      return result.success;
    } finally {
      setIsSending(false);
    }
  };

  return {
    club,
    isLoading,
    isSending,
    openWhatsApp,
    openPhone,
    openMaps,
    sendContactForm,
    refresh: loadClubContact,
  };
}
