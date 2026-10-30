import { Text, View, Pressable, TextInput, Alert, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useState } from "react";
import { useRouter, Link } from "expo-router";

function ProfileIcon() {
  return (
    <Svg style={styles.icon} width={90} height={90} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        stroke="#8f4a4e"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handlePress = () => {
    router.push("/home");
  };

  const handleLogIn = () => {
    if(!email.trim() || !password) {
      Alert.alert("Missing information", "Please fill in both fields.");
      return;
    }

    if(!EMAIL_REGEX.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    Alert.alert("Success", "You’re logged in.", [
      {
        text: "OK",
        onPress: () => {
          setEmail("");
          setPassword("");
          handlePress();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <ProfileIcon />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleLogIn}>
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>New here? </Text>
          <Link href="/register" style={styles.signupLink}>Sign up</Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf9f6",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    flexDirection: "column",
  },
  inputField: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#c2c2c2",
    padding: 14,
    fontSize: 18,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#8f4a4e",
    padding: 16,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 14,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#3b3737",
    fontSize: 16,
  },
  signupLink: {
    color: "#8f4a4e",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
