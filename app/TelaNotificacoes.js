import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import i18n from '../src/services/i18n';

export default function TelaNotificacoes({ language }) {

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: i18n[language].notificacoes,
        body: 'Não esqueça de revisar suas tarefas!',
      },
      trigger: { seconds: 5 } // 5 segundos para teste
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n[language].notificacoes}</Text>
      <Button title={i18n[language].agendar_notificacao} onPress={scheduleNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 }
});
