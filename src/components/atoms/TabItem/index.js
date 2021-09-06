import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  IconAddActive,
  IconAddNonActive,
  IconHomeActive,
  IconHomeNonActive,
  IconListActive,
  IconListNonActive,
} from '../../../assets';
import { colors } from '../../../utils';

const TabItem = ({ title, active, onPress, onLongPress }) => {
  const Icon = () => {
    if (title === 'Utama') {
      return active ? <IconHomeActive /> : <IconHomeNonActive />;
    }
    if (title === 'Tambah') {
      return active ? <IconAddActive /> : <IconAddNonActive />;
    }
    if (title === 'Daftar') {
      return active ? <IconListActive /> : <IconListNonActive />;
    }
    return <IconHomeActive />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.wrapperIcon(active)}>
        <Icon />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    color: colors.white,
    marginTop: 4,
  },
  wrapperIcon: (active) => ({
    backgroundColor: active ? '#E8E8E8' : '#333333',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32 / 2,
    // color: active ? colors.text.primary : colors.text.secondary,
    marginTop: 4,
  }),
});
