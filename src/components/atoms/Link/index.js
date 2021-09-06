import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../utils';

const Link = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.forgotPassword}>{title}</Text>
  </TouchableOpacity>
);

export default Link;

const styles = StyleSheet.create({
  forgotPassword: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
