import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { ResizeMode, Video } from "expo-av";
import { useAssets } from "expo-asset";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import LinkButton from "@/components/links/button";

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          isMuted={true}
          isLooping={true}
          shouldPlay={true}
          resizeMode={ResizeMode.COVER}
          source={{ uri: assets[0].uri }}
          style={styles.video}
        ></Video>
      )}
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>
          Ready to change the way you manage your money?
        </Text>
      </View>

      <View style={styles.buttons}>
      <Link
          href={"/login"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "900" }}>
              Login
            </Text>
          </TouchableOpacity>
        </Link>
      <Link
          href={"/signup"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: '#fff' },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{  fontSize: 22, fontWeight: "900" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    textTransform: "uppercase",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});

export default Page;
