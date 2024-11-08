import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Colors} from '../../common/style';

const Card = ({children}: any) => {
  return <View style={styles.inputContainer}>{children}</View>;
};

export default Card;

const deviceHeight = Dimensions.get('window').height;
console.log('deviceHeight', deviceHeight);
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: deviceHeight < 400 ? 15 : 35,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary700,
    borderRadius: 8,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
