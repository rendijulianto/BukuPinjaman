import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconBack, IconClose } from '../../../assets';
import { colors } from '../../../utils/colors';

const Header = ({ title, next, type, onPress, goBack }) => (
  <View style={styles.wrapper}>
    <TouchableOpacity onPress={goBack}>
      {type === 'back' && <IconBack style={styles.iconClose} />}
      {type === 'close' && <IconClose style={styles.iconClose} />}
    </TouchableOpacity>

    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.next}>{next}</Text>
    </TouchableOpacity>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.header.primary.text,
    fontWeight: '600',
    fontSize: 30,
    textAlign: 'center',
  },
  next: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  iconClose: {
    width: 16,
    height: 16,
  },
});
