import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NativeSplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { SplashScreen } from '@/components/ui/splash-screen';

// Keep the native splash visible until fonts are loaded (prevents font flash).
NativeSplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore — the native splash may already be hidden on some platforms.
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      NativeSplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  // Wait for fonts before rendering the app tree.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {isSplashVisible && <SplashScreen onFinish={() => setIsSplashVisible(false)} />}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaProvider>
  );
}