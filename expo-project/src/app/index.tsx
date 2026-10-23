import { Text, View, Pressable, TextInput, Alert, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg"
import { useState } from "react";

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

export default function Index() {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if(!email.trim() || !password) {
      Alert.alert("Missing information", "Please fill in both fields.");
      return;
    }

    if(!EMAIL_REGEX.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    };

    if(password.length < 8) {
      Alert.alert("Password too short", "Use at least 8 characters.");
      return;
    };

    if(!/[A-Z]/.test(password)) {
      Alert.alert("Password requirement", "Add at least one uppercase letter.");
      return;
    };

    if(!/[a-z]/.test(password)) {
      Alert.alert("Password requirement", "Add at least one lowercase letter.");
      return;
    };

    if(!/[^A-Za-z0-9]/.test(password)) {
      Alert.alert("Password requirement", "Add at least one special character.");
      return;
    };

    Alert.alert("Success", "Your inputs passed the checks.", [
      {
        text: "OK",
        onPress: () => {
          setEmail("");
          setPassword("");
        },
      },
    ]);
  }

  return (
    <View style = {styles.container}>
      <ProfileIcon />
      <View style = {styles.inputContainer}>
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
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
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
    justifyContent: "center"
  },
  icon: {
    marginBottom: 20
  },
  inputContainer: {
    width: "90%",
    flexDirection: "column"
  },
  inputField: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#d7d7d7",
    padding: 14,
    fontSize: 18,
    marginBottom: 15
  },
  button: {
    backgroundColor: "#8f4a4e",
    padding: 16,
    alignItems: "center",
    borderRadius: 8
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16
  }
});
