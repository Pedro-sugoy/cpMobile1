import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { auth, db } from "../services/firebase";
import { collection, onSnapshot, query, where, orderBy, deleteDoc, doc } from "firebase/firestore";

export default function TaskListScreen({ navigation }) {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, []);

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("taskList")}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>{t("delete")}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title={t("addTask")} onPress={() => navigation.navigate("AddTask")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 10 },
  task: { flexDirection: "row", justifyContent: "space-between", padding: 8, borderBottomWidth: 1 },
  delete: { color: "red" },
});
