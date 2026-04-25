import { StyleSheet, View, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import { useState } from 'react';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
  if (!fontsLoaded) {
    <AppLoading />
  }

  function pickNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = < StartGameScreen onPickNumber={pickNumberHandler} />;
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumbner={userNumber} onStartNewGame={startNewGameHandler} roundsNumber={guessRounds} />
  }


  return (

    <>
    <StatusBar  style='light'/>
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen} >
        <ImageBackground source={require('./assets/Images/background.jpg')} resizeMode='cover' style={styles.rootScreen} imageStyle={styles.backgroundImage}>

          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>

        </ImageBackground>
      </LinearGradient >

    </>

  )
};

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
})
