import { Alert, StyleSheet, Text, View, FlatList, useWindowDimensions } from "react-native"
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";


function generateRandomBetween(min, max, exclude) {
  const rnNum = Math.floor(Math.random() * (max - min)) + min;

  if (rnNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rnNum;
}


let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [userNumber, onGameOver, currentGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, [])
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
    setGuessRounds((previusGuessRouinds => [newRandumNumber, ...previusGuessRouinds]))
  }

  const guessRoundsListLength = guessRounds.length;
  const marginTopDistance = width < 380 ? 20 : 100;
  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>

      <View style={styles.controlsContainer}>
        <Card>
          <InstructionText style={styles.instructionText}>
            Higher or lower?
          </InstructionText>

          <View style={styles.buttonsContainer}>
            <PrimaryButton
              onPress={handleDirection.bind(this, 'lower')}
            >
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>

            <PrimaryButton
              onPress={handleDirection.bind(this, 'greater')}
            >
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </Card>
      </View>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View>

          <View style={styles.buttonsContainer}>
            <View >
              <PrimaryButton style={styles.buttonContainer} onPress={handleDirection.bind(this, 'lower')}>

                <Ionicons name="remove" size={24} color='white' />
              </PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
              <PrimaryButton style={styles.buttonContainer} onPress={handleDirection.bind(this, 'greater')}>

                <Ionicons name="add" size={24} color='white' />
              </PrimaryButton>
            </View>
          </View>
        </View>

      </>
    )
  }
  return (
    <View style={styles.screen}>
      <Title>Opponnent's Guess</Title>

      {content}

      <View style={styles.listContainer}>

        {/* {guessRounds.map((guessRound)=><Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList data={guessRounds}
          renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index}
            guess={itemData.item} />}
          keyExtractor={item => item} />
      </View>

    </View >
  )
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },

  controlsContainer: {
    marginTop: 36,
    width: '90%',
    maxWidth: 400,
  },

  instructionText: {
    marginBottom: 16,
    textAlign: 'center',
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12, // 👈 cleaner spacing (RN 0.71+)
  },

  listContainer: {
    flex: 1,
    width: '100%',
    padding: 16,
  },
});