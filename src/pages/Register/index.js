import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Gap, Header, Input, Link } from '../../components';
import {
  colors,
  showError,
  showSuccess,
  storeData,
  useForm,
} from '../../utils';

const Register = ({ navigation }) => {
  const dispacth = useDispatch();
  const [form, setForm] = useForm({
    fullName: '',
    moto: '-',
    email: '',
    password: '',
  });
  const onContinue = () => {
    dispacth({ type: 'SET_LOADING', value: true });
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const data = {
          fullName: form.fullName,
          moto: form.moto,
          email: form.email,
          uid: userCredential.user.uid,
        };
        const db = getDatabase();
        showSuccess('Berhasil mendaftarkan akun');

        set(ref(db, `users/${userCredential.user.uid}`), data);
        storeData('user', data);
        dispacth({ type: 'SET_LOADING', value: false });
        navigation.navigate('MainApp', data);
      })
      .catch((error) => {
        dispacth({ type: 'SET_LOADING', value: false });
        showError(error.message);
      });
  };
  return (
    <View style={styles.wrapper}>
      <Header
        title="Daftar"
        type="close"
        next="Masuk"
        goBack={() => navigation.goBack()}
        onPress={() => navigation.navigate('Login')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={105} />
        <View style={styles.content}>
          <Input
            placeholder="Nama lengkap"
            value={form.fullName}
            onChangeText={(value) => setForm('fullName', value)}
          />
          <Gap height={20} />
          <Input
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => setForm('email', value)}
          />
          <Gap height={20} />
          <Input
            placeholder="Kata Sandi"
            value={form.password}
            onChangeText={(value) => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={20} />
          <Link
            title="Sudah memiliki akun ?"
            onPress={() => navigation.navigate('Login')}
          />
          <Gap height={46} />
        </View>
        <View style={styles.wrapperButton}>
          <TouchableOpacity style={styles.button} onPress={onContinue}>
            <Text style={styles.textButton}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 40,
    flex: 1,
    paddingHorizontal: 36,
  },
  content: {
    justifyContent: 'center',

    flex: 1,
  },
  wrapperButton: {
    alignItems: 'center',
    flex: 1,
  },
  forgotPassword: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  button: {
    backgroundColor: colors.button.primary.background,
    borderRadius: 100,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
