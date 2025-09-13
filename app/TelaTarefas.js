import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '../src/context/ThemeContext';

export default function TelaTarefas({ language, i18n }) {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const { data: motivacao, isLoading } = useQuery({
    queryKey: ['motivacional'],
    queryFn: async () => {
      const res = await fetch('https://type.fit/api/quotes');
      const json = await res.json();
      return json[Math.floor(Math.random() * json.length)];
    },
  });

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: input, done: false }]);
      setInput('');
    }
  };

  const toggleDone = id => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const removeTask = id => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>{i18n.tarefas}</Text>

      <TextInput
        placeholder={i18n.adicionar}
        placeholderTextColor={theme.textColor}
        value={input}
        onChangeText={setInput}
        style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
      />
      <Button title={i18n.adicionar} onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <TouchableOpacity onPress={() => toggleDone(item.id)}>
              <Text
                style={{
                  color: theme.textColor,
                  textDecorationLine: item.done ? 'line-through' : 'none',
                }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button title={i18n.remover} onPress={() => removeTask(item.id)} />
          </View>
        )}
      />

      {isLoading ? (
        <Text style={[styles.motivacao, { color: theme.textColor }]}>{i18n.mensagem_motivacional}: carregando...</Text>
      ) : (
        motivacao && (
          <View style={styles.motivacao}>
            <Text style={{ color: theme.textColor }}>{i18n.mensagem_motivacional}:</Text>
            <Text style={{ color: theme.textColor }}>"{motivacao.text}" - {motivacao.author || 'Unknown'}</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8 },
  task: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  motivacao: { marginTop: 16, padding: 8, borderWidth: 1, borderColor: '#ccc' },
});
