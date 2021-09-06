import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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

const Login = ({ navigation }) => {
  const dispacth = useDispatch();
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const LoginAkun = () => {
    dispacth({ type: 'SET_LOADING', value: true });
    const auth = getAuth();

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        showSuccess('Berhasil masuk');
        storeData('user', user);
        dispacth({ type: 'SET_LOADING', value: false });
        navigation.replace('MainApp');
      })
      .catch((error) => {
        console.log('logout', error);
        dispacth({ type: 'SET_LOADING', value: false });
        showError(error.message);
      });
  };
  return (
    <View style={styles.wrapper}>
      <Header
        title="Masuk"
        next="Daftar"
        onPress={() => navigation.navigate('Register')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={105} />
        <View style={styles.content}>
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
            title="Belum punya akun ?"
            onPress={() => navigation.navigate('Register')}
          />
          <Gap height={46} />
          <View style={styles.wrapperButton}>
            <TouchableOpacity style={styles.button} onPress={LoginAkun}>
              <Text style={styles.textButton}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

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
  HaventAccount: {
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
