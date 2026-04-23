import { StyleSheet, View, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import { useState } from 'react';
import Colors from './constents/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  function pickNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = < StartGameScreen onPickNumber={pickNumberHandler} />;
  if (userNumber) {
    screen = <GameScreen  userNumber={userNumber}/>;
  }

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen} >
      <ImageBackground source={require('./assets/Images/background.jpg')} resizeMode='cover' style={styles.rootScreen} imageStyle={styles.backgroundImage}>

        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>

      </ImageBackground>
    </LinearGradient >
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
