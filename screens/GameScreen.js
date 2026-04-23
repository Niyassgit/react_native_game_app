import { Alert, StyleSheet, Text, View } from "react-native"
import Title from "../components/ui/Title";
import { useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";



function generateRandomBetween(min, max, exclude) {
  const rnNum = Math.floor(Math.random() * (max - min)) + min;

  if (rnNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rnNum;
}


let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber }) => {
  const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);


  function handleDirection(direction) {

    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", 'You know that is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandumNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);

    setCurrentGuess(newRandumNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponnent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={handleDirection.bind(this, 'lower')}>-</PrimaryButton>
          <PrimaryButton onPress={handleDirection.bind(this, 'greater')}>+</PrimaryButton>
        </View>
      </View>

      <View>LOG ROUNDS</View>

    </View>
  )
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24
  },

})
