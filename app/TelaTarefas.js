import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../src/context/ThemeContext';
import { Timestamp } from 'firebase/firestore';
import axios from 'axios';

export default function TelaTarefas({ language, i18n }) {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [motivacao, setMotivacao] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      const stored = await AsyncStorage.getItem('@tarefas');
      if (stored) setTasks(JSON.parse(stored));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@tarefas', JSON.stringify(tasks));
  }, [tasks]);

  // Função para buscar o clima atual
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const latitude = -23.5505;  // São Paulo
        const longitude = -46.6333; // São Paulo
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude,
            longitude,
            current_weather: true,
            timezone: 'America/Sao_Paulo',
          },
        });
        const temperature = response.data.current_weather.temperature;
        if (temperature > 30) {
          setMotivacao(i18n.motivacao_calor);
        } else if (temperature > 20) {
          setMotivacao(i18n.motivacao_agradavel);
        } else {
          setMotivacao(i18n.motivacao_frio);
        }
      } catch (error) {
        setMotivacao(i18n.clima_erro);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [language]); // refetch se o idioma mudar

  const addTask = () => {
    if (title.trim() && description.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        completed: false,
        dueDate: new Date('2025-09-10T14:00:00Z').toISOString(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
    }
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed, updatedAt: Timestamp.now() } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Pop-up do clima no topo */}
      <View style={[styles.popup, { backgroundColor: theme.textColor }]}>
        {loading ? (
          <Text style={{ color: theme.backgroundColor }}>{i18n.clima_carregando}</Text>
        ) : (
          <Text style={{ color: theme.backgroundColor }}>{motivacao}</Text>
        )}
      </View>

      <Text style={[styles.title, { color: theme.textColor, marginTop: 60 }]}>{i18n.tarefas}</Text>

      <TextInput
        placeholder={i18n.titulo_tarefa}
        placeholderTextColor={theme.textColor}
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
      />
      <TextInput
        placeholder={i18n.descricao_tarefa}
        placeholderTextColor={theme.textColor}
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
      />
      <Button title={i18n.adicionar} onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.task, { borderColor: theme.textColor }]}>
            <TouchableOpacity onPress={() => toggleDone(item.id)} style={{ flex: 1 }}>
              <Text
                style={{
                  color: theme.textColor,
                  fontWeight: 'bold',
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                }}
              >
                {item.title}
              </Text>
              <Text style={{ color: theme.textColor }}>{item.description}</Text>
              <Text style={{ color: theme.textColor, fontSize: 12 }}>
                {i18n.due}: {new Date(item.dueDate).toLocaleString()}
              </Text>
              <Text style={{ color: theme.textColor, fontSize: 12 }}>
                {i18n.status}: {item.completed ? i18n.status_concluida : i18n.status_pendente}
              </Text>
            </TouchableOpacity>

            <Button title={i18n.remover} onPress={() => removeTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  popup: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 12,
    alignItems: 'center',
    zIndex: 10,
  },
  title: { fontSize: 24, marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8 },
  task: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
});
