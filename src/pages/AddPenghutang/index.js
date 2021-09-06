import { child, getDatabase, push, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { DummyContent1, DummyProfile2, IconAdd, IconClose2 } from '../../assets';
import { Gap, Input } from '../../components';
import { colors, getData, showError, showSuccess, useForm } from '../../utils';

const AddPenghutang = ({ navigation }) => {
  const [form, setForm] = useForm({
    fullName: '',
    quantity: 0,
    method: '',
    note: '',
    dateReturn: '',
  });
  const [user, setUser] = useState({});
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(DummyProfile2);
  const [photoForDB, setPhotoForDB] = useState('');
  const [hasProofImage, setHasProofImage] = useState(false);
  const [proofImage, setProofImage] = useState(DummyContent1);
  const [proofImageForDB, setProofImageForDB] = useState('');

  const [dateReturn, setDateReturn] = useState(new Date());
  const [openDateReturn, setOpenDateReturn] = useState(false);
  const dispacth = useDispatch();
  useEffect(() => {
    getData('user')
      .then((res) => {
        setUser(res);
      })
      .catch((error) => {
        showError(error.message);
      });
  }, []);

  const getProofImage = () => {
    launchImageLibrary(
      { quantity: 1, maxWidth: 500, maxHeight: 300, includeBase64: true },
      (response) => {
        if (response.didCancel || response.error) {
          showError('Oppss, sepertinya anda tidak memilih foto');
        } else {
          showSuccess('Berhasil memilih foto');
          const source = { uri: response.assets[0].uri };
          setProofImageForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`
          );
          setProofImage(source);
          setHasProofImage(true);
        }
      }
    );
  };
  const getImageProfile = () => {
    launchImageLibrary(
      { quantity: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true },
      (response) => {
        if (response.didCancel || response.error) {
          showError('Oppss, sepertinya anda tidak memilih foto');
        } else {
          showSuccess('Berhasil memilih foto');
          const source = { uri: response.assets[0].uri };
          setPhotoForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`
          );
          setPhoto(source);
          setHasPhoto(true);
        }
      }
    );
  };

  const uploadAndContinue = () => {
    // const db = getDatabase();
    const data = form;
    data.profile = photoForDB;
    data.proof = proofImageForDB;
    data.status = 'Belum';
    data.dateCreated = new Date().toDateString();
    data.dateReturn = dateReturn.toDateString();
    if (!data.proof || !data.profile) {
      console.log('Data yang akan di post : ', data);
      showError('Data profil atau bukti belum diisi');
      return null;
    }
    try {
      const db = getDatabase();
      const newHistoryKey = push(child(ref(db), 'histories')).key;
      const updates = {};
      updates[`histories/${user.uid}/${newHistoryKey}/`] = data;
      update(ref(db), updates);
      dispacth({ type: 'SET_LOADING', value: false });
      showSuccess('Berhasil menambahkan penghutang baru!!');
      navigation.replace('MainApp');
    } catch (error) {
      dispacth({ type: 'SET_LOADING', value: false });
      showError(error.message);
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.wrapperprofilePenghutang}>
          <TouchableOpacity
            onPress={getImageProfile}
            style={styles.borderAvatar}
          >
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconClose2 style={styles.icon} />}
            {!hasPhoto && <IconAdd style={styles.icon} />}
          </TouchableOpacity>
          <Gap height={80} />
        </View>
        <View style={styles.content}>
          <Input
            placeholder="Nama penghutang"
            value={form.fullName}
            onChangeText={(value) => setForm('fullName', value)}
          />
          <Gap height={20} />
          <Input
            placeholder="Jumlah Pinjaman"
            value={form.qantity}
            onChangeText={(value) => setForm('quantity', value)}
          />
          <Gap height={20} />
          <Input
            placeholder="Metode Pinjaman"
            value={form.method}
            onChangeText={(value) => setForm('method', value)}
          />
          <Gap height={20} />
          <Input
            placeholder="Catatan "
            value={form.note}
            onChangeText={(value) => setForm('note', value)}
          />
          <Gap height={20} />
          <Input
            placeholder="Tanggal Pengembalian"
            value={dateReturn.toDateString()}
            onChangeText={(value) => setForm('dateReturn', value)}
          />
          <Gap height={20} />
          <Button
            title="Klik Tanggal Pengembalian"
            onPress={() => setOpenDateReturn(true)}
          />
          <DatePicker
            title="Tanggal Pengembalian"
            modal
            mode="date"
            open={openDateReturn}
            date={dateReturn}
            onConfirm={(dateReturn) => {
              setOpenDateReturn(false);
              setDateReturn(dateReturn);
            }}
            onCancel={() => {
              setOpenDateReturn(false);
            }}
          />
          <Gap height={20} />

          <Text>Bukti : </Text>
          <Gap height={10} />
          <TouchableOpacity onPress={getProofImage} style={styles.frameImage}>
            <Image source={proofImage} style={styles.formImage} />

            {hasProofImage && <IconClose2 style={styles.iconFormImage} />}
            {!hasProofImage && <IconAdd style={styles.iconFormImage} />}
          </TouchableOpacity>
          <Gap height={20} />

          <View style={styles.wrapperButton}>
            <TouchableOpacity style={styles.button} onPress={uploadAndContinue}>
              <Text style={styles.textButton}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPenghutang;

const styles = StyleSheet.create({
  content: {
    paddingTop: 23,
    paddingHorizontal: 36,
    backgroundColor: 'white',
  },
  wrapperButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.button.primary.background,
    borderRadius: 100,
    width: 150,
    height: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  textButton: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
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
  icon: {
    position: 'absolute',
    right: 0,
    top: 15,
  },
  formImage: {
    width: '100%',
    height: 200,
  },
  iconFormImage: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  wrapperprofilePenghutang: {
    backgroundColor: colors.primary,
    paddingTop: 40,
    paddingHorizontal: 89,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
