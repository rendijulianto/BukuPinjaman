import {
  getDatabase,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Gap, ListPenghutang } from '../../components';
import { colors, getData, showError } from '../../utils';

const HistoryPenghutang = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [histories, setHistories] = useState([]);
  useEffect(() => {
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
      limitToLast(1000)
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Gap height={20} />
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
              type="history"
              status={penghutang.data.status}
              method={penghutang.data.method}
              onPress={() => navigation.navigate('EditPenghutang', penghutang)}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default HistoryPenghutang;

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.white,
    paddingHorizontal: 26,
  },
  header: {
    paddingHorizontal: 36,
  },
});
