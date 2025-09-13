import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';
import ThemeToggleButton from '../src/components/ThemeToggleButton';

export default function TelaConfiguracoes({ navigation, language, i18n }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ThemeToggleButton />
      <Button
        title={i18n.notificacoes}
        onPress={() => navigation.navigate('Notificacoes')}
        color={theme.textColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
});
