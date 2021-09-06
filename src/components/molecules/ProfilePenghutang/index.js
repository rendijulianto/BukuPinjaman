import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../utils';
import { Gap } from '../../atoms';

const ProfilePenghutang = ({ avatar, name }) => (
  <View style={styles.wrapper}>
    <View style={styles.borderAvatar}>
      <Image source={avatar} style={styles.avatar} />
    </View>
    <Gap height={23} />
    <View>
      <Text style={styles.name}>{name}</Text>
    </View>
  </View>
);

export default ProfilePenghutang;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 40,
    paddingHorizontal: 89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 158,
    height: 158,
    borderRadius: 158 / 2,
  },
  borderAvatar: {
    width: 165,
    height: 165,
    borderRadius: 165 / 2,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  name: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
  },
});
