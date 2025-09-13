import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { auth, db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddTaskScreen({ navigation }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const user = auth.currentUser;

  const addTask = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, "tasks"), {
      text,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
    setText("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t("taskPlaceholder")}
        value={text}
        onChangeText={setText}
      />
      <Button title={t("save")} onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});
