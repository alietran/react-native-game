import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Colors} from '../common/style';
import PrimaryButton from '../components/UI/PrimaryButton';
import Title from '../components/UI/Title';

interface INewGame {
  roundsNumber: number;
  userNumber: number;
  onStartNewGame: () => void;
}

const GameOverScreen = ({
  roundsNumber,
  userNumber,
  onStartNewGame,
}: INewGame) => {
  const {width} = useWindowDimensions();

  let imageSize = 300;

  if (width > 800) {
    imageSize = 120;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Game Over!</Title>
      <View style={[styles.imageContainer, imageStyle]}>
        <Image
          style={styles.image}
          source={require('../assets/images/success.png')}
        />
      </View>
      <Text style={styles.summaryInfo}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
        rounds to guess the number
        <Text style={styles.highlight}> {userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}> Start New Game</PrimaryButton>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;
console.log('Device width: ' + deviceWidth);

export default GameOverScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: deviceWidth < 330 ? 150 : 250,
    height: deviceWidth < 330 ? 150 : 250,
    borderRadius: deviceWidth < 330 ? 75 : 125,
    borderWidth: 3,
    borderColor: Colors.primary500,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  highlight: {
    fontSize: 28,
    color: Colors.primary700,
  },
  summaryInfo: {
    fontSize: 24,
    textAlign: 'center',
  },
});
