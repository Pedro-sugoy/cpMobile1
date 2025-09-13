import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const { toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "pt" : "en");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("welcome")}</Text>
      <Button title={t("changeTheme")} onPress={toggleTheme} />
      <Button title={t("changeLanguage")} onPress={changeLanguage} />
      <Button title={t("goTasks")} onPress={() => navigation.navigate("Tasks")} />
      <Button title={t("logout")} color="red" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20 },
});
