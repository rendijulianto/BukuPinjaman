import { getAuth, signOut } from 'firebase/auth';
import {
  getDatabase,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref
} from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Gap, ListPenghutang, Profile } from '../../components';
import { colors, getData, showError, showSuccess } from '../../utils';

const Home = ({ navigation }) => {
  const [user, setUser] = useState({});

  const [histories, setHistories] = useState([]);
  useEffect(() => {

    console.log('data histories', histories);
    getData('user')
      .then((res) => {
        setUser(res);
        console.log('Data : ', res);
      })
      .catch((error) => {
        showError(error.message);
      });
    const db = getDatabase();
    const urlHistory = `histories/${user.uid}/`;
    const historyRef = query(
      ref(db, urlHistory),
      orderByChild('dateCreated'),
      limitToLast(5)
    );
    onValue(historyRef, (snapshot) => {
      if (snapshot.val()) {
        const dataHistory = [];
        const oldData = snapshot.val();
        Object.keys(oldData).map((key) => {
          dataHistory.push({
            id: key,
            data: oldData[key],
          });
        });
    
        setHistories(dataHistory);
      }
    });
  }, [user.uid]);

  const LogoutAkun = () => {
    const auth = getAuth();
    signOut(auth)
      .then((res) => {
        console.log('logout', res);
        showSuccess('Opsss, kamu keluar aplikasi');
        navigation.replace('Login');
      })
      .catch((error) => {
        console.log('logout', error);
        showError(error.message);
      });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapperProfile}>
          <Profile />
          <Gap height={30} />
          <TouchableOpacity style={styles.logout} onPress={LogoutAkun}>
            {/* <IconLogout /> */}
            <Button title="Keluar" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Gap height={24} />
          {histories.length === 0 && <Button title="Data tidak ditemukan!!" />}
          {histories &&
            histories.map((penghutang) => (
              <ListPenghutang
                key={penghutang.id}
                avatar={{ uri: penghutang.data.profile }}
                name={penghutang.data.fullName}
                quantity={penghutang.data.quantity}
                dateReturn={penghutang.data.dateReturn}
                dateCreated={penghutang.data.dateCreated}
                type="home"
                method={penghutang.data.method}
                onPress={() =>
                  navigation.navigate('EditPenghutang', penghutang)
                }
              />
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapperProfile: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 26,
  },
});
