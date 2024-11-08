import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../common/style';

const NumberContainer = ({children}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: deviceWidth < 330 ? 16 : 24,
    borderWidth: 4,
    borderColor: Colors.accent500,
    margin: deviceWidth < 330 ? 16 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 330 ? 36 : 40,
    fontWeight: 'bold',
  },
});
