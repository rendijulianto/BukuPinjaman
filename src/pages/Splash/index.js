import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { IconSplash } from '../../assets';
import { colors } from '../../utils';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.replace('MainApp');
          const { uid } = user;
          // ...
        } else {
          navigation.replace('Login');
        }
      });
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Buku Pinjaman</Text>
      <IconSplash style={{ width: 100, height: 100 }} />
      <Text style={styles.subTitle}>Ingatkan temanmu yang punya hutang</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.white,
    marginBottom: 50,
  },
  subTitle: {
    fontSize: 16,
    color: colors.white,
    marginTop: 50,
  },
});
