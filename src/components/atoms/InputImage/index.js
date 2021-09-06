import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const InputImage = ({ proof }) => (
  <View>
    <View style={styles.frameImage}>
      <Image source={proof} style={styles.form} />
    </View>
  </View>
);

export default InputImage;

const styles = StyleSheet.create({
  form: {
    width: '100%',
    height: 200,
  },
  frameImage: {
    position: 'relative',
  },
});
