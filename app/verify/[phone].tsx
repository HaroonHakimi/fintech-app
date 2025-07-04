import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { Fragment } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Colors from "@/constants/Colors";
const CELL_COUNT = 6;

const Page = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin?: string;
  }>();

  const [code, setCode] = React.useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      });

      await setActive!({ session: signUp!.createdSessionId });
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };
  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });

      await setActive!({ session: signIn!.createdSessionId });
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };

  React.useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6 digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phone} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused && <Cursor />)}
              </Text>
            </View>
            {index === 2 && (
              <View key={`seperator-${index}`} style={styles.seperator} />
            )}
          </Fragment>
          // <Text
          //   key={index}
          //   style={[styles.cell, isFocused && styles.focusCell]}
          //   onLayout={getCellOnLayoutHandler(index)}>
          //   {symbol || (isFocused && <Cursor />)}
          // </Text>
        )}
      />

      <Link href={`/login`} replace asChild>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink]}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: { marginVertical: 20, marginHorizontal: "auto", gap: 12 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    color: "#000", // text color
  },
  focusCell: {
    borderColor: "#000",
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: Colors.dark,
    fontSize: 36,
    textAlign: "center",
  },
  seperator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
});

export default Page;
