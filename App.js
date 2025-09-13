import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import TelaTarefas from './app/TelaTarefas';
import TelaConfiguracoes from './app/TelaConfiguracoes';
import TelaNotificacoes from './app/TelaNotificacoes';

import ptBR from './src/locales/pt.json';
import en from './src/locales/eng.json';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const AppNavigator = () => {
  const [language, setLanguage] = useState('pt');
  const i18n = language === 'pt' ? ptBR : en;
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'pt' ? 'en' : 'pt'));
  };

  const headerButtons = () => (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Button title={language === 'pt' ? 'EN' : 'PT'} onPress={toggleLanguage} />
      <Button title={theme.mode === 'light' ? '🌙' : '☀️'} onPress={toggleTheme} />
    </View>
  );

  return (
    <NavigationContainer theme={theme.mode === 'light' ? DefaultTheme : DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Tarefas"
          options={{ title: i18n.tarefas, headerRight: headerButtons }}
        >
          {props => <TelaTarefas {...props} language={language} i18n={i18n} />}
        </Stack.Screen>

        <Stack.Screen
          name="Configuracoes"
          options={{ title: i18n.configuracoes, headerRight: headerButtons }}
        >
          {props => (
            <TelaConfiguracoes
              {...props}
              language={language}
              setLanguage={setLanguage}
              i18n={i18n}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Notificacoes"
          options={{ title: i18n.notificacoes, headerRight: headerButtons }}
        >
          {props => <TelaNotificacoes {...props} language={language} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
