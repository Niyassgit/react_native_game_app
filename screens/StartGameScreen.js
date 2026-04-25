import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const StartGameScreen = ({ onPickNumber }) => {

  const [enteredNumber, setEnteredNumber] = useState('');
  const { width, height } = useWindowDimensions()

  function inputNumebrHandler(enteredNumber) {
    setEnteredNumber(enteredNumber);
  }
  function confirmInputHandler() {
    const userInput = parseInt(enteredNumber);
    if (isNaN(userInput) || userInput <= 0 || userInput > 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetEnterdNumberHandler }]);
      return;
    }

    onPickNumber(userInput);
  }

  function resetEnterdNumberHandler() {
    setEnteredNumber('');
  }

  const marginTopDistance = height < 380 ? 20 : 100;
  return (
    <ScrollView >
      <KeyboardAvoidingView style={styles.rootContainer} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title style={styles.inputContainer}>Guess My Number</Title>

          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={inputNumebrHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetEnterdNumberHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>

        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

// const deviceHeight=Dimensions.get('window').height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center'
  },
  numberInput: {
    height: 40,
    width: 50,
    textAlign: "center",
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
