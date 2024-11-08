import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import AddIcon from '../assets/icons/add.svg';
import MinusIcon from '../assets/icons/minus.svg';
import {Colors} from '../common/style';
import GameLogItem from '../components/Game/GameLogItem';
import NumberContainer from '../components/Game/NumberContainer';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';
import PrimaryButton from '../components/UI/PrimaryButton';
import Title from '../components/UI/Title';
interface IGame {
  userNumber: number;
  onGameOver: (guessRound: number) => void;
}
function generateRandomBetween(min: number, max: number, exclude: number) {
  const rndNum = Math.floor(Math.random() * (max - min) + min);

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude); //
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;
function GameScreen({userNumber, onGameOver}: IGame) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

  const {width} = useWindowDimensions();

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('lower')}>
              <MinusIcon width={16} height={16} fill="#fff" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              <AddIcon width={16} height={16} fill="#fff" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver, guessRounds.length]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction: string) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
  }

  if (width > 800) {
    content = (
      <>
        <View style={styles.buttonWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('lower')}>
              <MinusIcon width={16} height={16} fill="#fff" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              <AddIcon width={16} height={16} fill="#fff" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guess => {
          return <Text key={guess}>{guess}</Text>;
        })} */}

        <FlatList
          data={guessRounds}
          renderItem={itemData => (
            <GameLogItem
              roundNumber={guessRounds.length - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={item => item.toString()}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buttonWide: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: deviceWidth > 800 ? 100 : 50,
  },
  screen: {
    flex: 1,
    paddingHorizontal: deviceWidth > 800 ? 60 : 24,
    paddingTop: deviceWidth > 800 ? 60 : 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent500,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
