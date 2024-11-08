import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';

const InstructionText = ({children, style}: any) => {
  //style nhận từ component cha
  return <Text style={[styles.title, style]}>{children}</Text>; // css ở phía sau sẽ ghi đè lên css phía trước
};
const deviceWidth = Dimensions.get('window').width;

export default InstructionText;
const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: deviceWidth < 450 ? 16 : 24,
  },
});
