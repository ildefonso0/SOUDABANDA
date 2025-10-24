import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { questionsService } from '@/services/questionsService';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    questionsService.initialize().catch((error) => {
      console.error('Failed to initialize questions service:', error);
    });
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="jogo" options={{ headerShown: false }} />
        <Stack.Screen name="sobre-angola" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
