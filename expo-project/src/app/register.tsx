import { Text, View, Pressable, TextInput, Alert, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useState } from "react";
import { useRouter } from "expo-router";

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
const USERNAME_REGEX = /^[A-Za-z0-9_]+$/;

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const onSignUp = () => {
    router.push("/");
  }

  const handleSignUp = () => {
    if(!email.trim() || !username.trim() || !password || !confirmPassword) {
      Alert.alert("Missing information", "Please fill in all the fields.");
      return;
    }

    if(!EMAIL_REGEX.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if(!USERNAME_REGEX.test(username.trim())) {
      Alert.alert("Invalid username format", "Use only letters, numbers, and underscores.");
      return;
    }

    if(username.length < 3 || username.length > 20) {
      Alert.alert("Invalid username length", "Your username must be between 3 and 20 characters long.");
      return;
    }

    if(password.length < 8) {
      Alert.alert("Password too short", "Use at least 8 characters.");
      return;
    }

    if(!/[A-Z]/.test(password)) {
      Alert.alert("Password requirement", "Add at least one uppercase letter.");
      return;
    }

    if(!/[a-z]/.test(password)) {
      Alert.alert("Password requirement", "Add at least one lowercase letter.");
      return;
    }

    if(!/[^A-Za-z0-9]/.test(password)) {
      Alert.alert("Password requirement", "Add at least one special character.");
      return;
    }

    if(password != confirmPassword) {
      Alert.alert("Password don't match", "Please enter the same password in both fields.");
      return;
    }

    Alert.alert("Success", "Account created.", [
      {
        text: "OK",
        onPress: () => {
          onSignUp();
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
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
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
    borderColor: "#d7d7d7",
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
});
