import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Detail() {
  const { name, image } = useLocalSearchParams<{
    name?: string;
    image?: string;
  }>();

  return (
    <View style={styles.container}>
      {}

      {image ? (
        <Image source={{ uri: image }} style={styles.image} contentFit="cover" />
      ) : null}

      <Text style={styles.name}>{name ?? "Unknown artist"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 16,
  },
  name: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "400",
    textAlign: "center",
    color: "#000",
  },
});
