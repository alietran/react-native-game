import React, {useState} from 'react';

import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from './src/common/style';
import GameOverScreen from './src/screens/GameOverScreen';
import GameScreen from './src/screens/GameScreen';
import StartGameScreen from './src/screens/StartGameScreen';

function App(): React.JSX.Element {
  const [userNumber, setUserNumber] = useState<any>();
  const [guessRounds, setGuessRounds] = useState<number>(0);
  const [gameIsOver, setGameIsOver] = useState(true);

  function pickedNumberHandler(pickedNumber: number) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverScreenHandler(numberOfRounds: number) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameScreenHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverScreenHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameScreenHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.rootScreen}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent600]} // Yellow to orange gradient
        style={styles.rootScreen}>
        <ImageBackground
          source={require('./src/assets/images/xucsac.jpg')}
          resizeMode="cover"
          imageStyle={styles.backgroundImgae}
          style={styles.rootScreen}>
          {screen}
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default App;
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImgae: {
    opacity: 0.15,
  },
});
