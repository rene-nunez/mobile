import { Text, View, Button, Switch, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export default function Index() {
  const [switchValue, setSwitchValue] = useState(false);
  const [name, setName] = useState("");

  const onPressLearnMore = () => {
    alert(`Welcome ${name || "there"}!`);
  };

  const onChangeSwitch = (value: boolean) => {
    console.warn(`Switch value changed to: ${value}`);
    setSwitchValue(value);
  };

  const onTextInput = (text: string) => {
    setName(text);
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={onTextInput}
        placeholder="Write your name here!"
      />
      <Switch
        value={switchValue}
        onValueChange={onChangeSwitch}
      />
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
