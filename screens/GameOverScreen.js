import { StyleSheet, Text, View } from "react-native"
import Title from "../components/ui/Title"
import { Image } from "react-native"
import Colors from "../constants/colors"
import PrimaryButton from "../components/ui/PrimaryButton"

const GameOverScreen = ({ roundsNumber, userNumbner, onStartNewGame }) => {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/Images/success.png')} resizeMode="center" />
      </View>
      <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number{' '} <Text style={styles.highlight}>{userNumbner}</Text>.</Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  )
}

export default GameOverScreen;


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,          // ❗ required for perfect circle
    borderRadius: 150,    // half of width/height
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    image: '100%',
    height: '100%',

  },
  summaryText: {
    fontSize: 24,
    fontFamily: 'open-sans',
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  }
})
