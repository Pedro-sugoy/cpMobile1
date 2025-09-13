import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';

export default function TelaConfiguracoes({ navigation, language, setLanguage, i18n }) {
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'pt' ? 'en' : 'pt'));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>{i18n.configuracoes}</Text>

      <Button
        title={`${i18n.idioma}: ${language === 'pt' ? 'PT' : 'EN'}`}
        onPress={toggleLanguage}
        color={theme.textColor}
      />

      <View style={{ marginVertical: 10 }} />

      <Button
        title={`${i18n.tema}: ${theme.mode === 'light' ? i18n.tema_claro : i18n.tema_escuro}`}
        onPress={toggleTheme}
        color={theme.textColor}
      />

      <View style={{ marginVertical: 10 }} />

      <Button
        title={i18n.notificacoes}
        onPress={() => navigation.navigate('Notificacoes')}
        color={theme.textColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
});
