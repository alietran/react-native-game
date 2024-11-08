import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {FontFamily} from '../../common/style';

const Title = ({children}: {children: any}) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

export default Title;
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderWidth: Platform.select({ios: 0, android: 2}),
    borderColor: 'white',
    padding: 12,
    fontFamily: FontFamily.playWriteRegular,
  },
});
