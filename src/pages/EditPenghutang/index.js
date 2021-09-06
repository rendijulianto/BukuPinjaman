import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, set } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { IconClose2 } from '../../assets';
import { Gap, Input } from '../../components';
import { colors, getData, showError, showSuccess, useForm } from '../../utils';

const EditPenghutang = ({ navigation, route }) => {
  const dataPenghutang = route.params;

  const [form, setForm] = useForm({
    fullName: dataPenghutang.data.fullName,
    quantity: dataPenghutang.data.quantity,
    method: dataPenghutang.data.method,
    note: dataPenghutang.data.note,
    status: dataPenghutang.data.status,
    dateReturn: dataPenghutang.data.dateReturn,
  });

  const dispacth = useDispatch();

  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState({ uri: dataPenghutang.data.profile });
  const [photoForDB, setPhotoForDB] = useState(dataPenghutang.data.profile);
  const [proofImage, setProofImage] = useState({
    uri: dataPenghutang.data.proof,
  });
  const [proofImageForDB, setProofImageForDB] = useState(
    dataPenghutang.data.proof
  );
  const [dateReturn, setDateReturn] = useState(
    new Date(dataPenghutang.data.dateReturn)
  );
  const [openDateReturn, setOpenDateReturn] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Belum');

  useEffect(() => {
    console.log('Form : ', dataPenghutang);
    getData('user')
      .then((res) => {
        setUser(res);
      })
      .catch((error) => {
        showError(error.message);
      });
  }, []);

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
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
        }
      }
    );
  };

  const uploadAndContinue = () => {
    // const db = getDatabase();
    const data = form;
    data.profile = photoForDB;
    data.proof = proofImageForDB;
    data.status = selectedStatus;
    data.dateCreated = new Date().toDateString();
    data.dateReturn = dateReturn.toDateString();
    if (!data.proof || !data.profile) {
      console.log('Data yang akan di post gagal : ', data);
      showError('Data profil atau bukti belum diisi');
      return null;
    }
    dispacth({ type: 'SET_LOADING', value: true });
    const db = getDatabase();
    set(ref(db, `histories/${user.uid}/${dataPenghutang.id}/`), data)
      .then((res) => {
        console.log(res);
        dispacth({ type: 'SET_LOADING', value: false });
      })
      .catch((error) => {
        dispacth({ type: 'SET_LOADING', value: false });
        console.log(error.message);
      });

    showSuccess('Berhasil mengubah data penghutang !!');
    navigation.replace('MainApp');
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
            <IconClose2 style={styles.icon} />
          </TouchableOpacity>
          <Gap height={80} />
        </View>
        <View style={styles.content}>
          <Text>Nama penghutang : </Text>
          <Gap height={10} />
          <Input
            placeholder="Nama penghutang"
            value={form.fullName}
            onChangeText={(value) => setForm('fullName', value)}
          />
          <Gap height={20} />
          <Text>Jumlah Pinjaman : </Text>
          <Gap height={10} />
          <Input
            placeholder="Jumlah Pinjaman"
            value={form.quantity}
            onChangeText={(value) => setForm('quantity', value)}
          />
          <Gap height={20} />
          <Text>Metode Pinjaman : </Text>
          <Gap height={10} />
          <Input
            placeholder="Metode Pinjaman"
            value={form.method}
            onChangeText={(value) => setForm('method', value)}
          />
          <Gap height={20} />
          <Text>Tanggal Pinjam : </Text>
          <Gap height={10} />
          <Input
            placeholder="Tanggal Pinjaman"
            value={dataPenghutang.data.dateCreated}
            editable={false}
          />
          <Gap height={20} />
          <Text>Tanggal Pengembalian : </Text>
          <Gap height={10} />
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

            <IconClose2 style={styles.iconFormImage} />
          </TouchableOpacity>
          <Gap height={20} />
          <Text> Status : </Text>
          <Gap height={10} />
          {form.status === 'Belum' && (
            <Picker
              style={styles.select}
              ref={pickerRef}
              selectedValue={selectedStatus}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedStatus(itemValue)
              }
            >
              <Picker.Item label="Belum" value="Belum" />
              <Picker.Item label="Lunas" value="Lunas" />
            </Picker>
          )}
          {form.status === 'Lunas' && (
            <Picker
              style={styles.select}
              ref={pickerRef}
              selectedValue={selectedStatus}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedStatus(itemValue)
              }
            >
              <Picker.Item label="Belum" value="Belum" />
              <Picker.Item label="Lunas" value="Lunas" />
            </Picker>
          )}
          <Gap height={20} />

          <View style={styles.wrapperButton}>
            <TouchableOpacity style={styles.button} onPress={uploadAndContinue}>
              <Text style={styles.textButton}>Simpan Perubahan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditPenghutang;

const styles = StyleSheet.create({
  profilePenghutang: {
    backgroundColor: colors.primary,
  },
  content: {
    paddingTop: 23,
    paddingHorizontal: 36,
    backgroundColor: 'white',
  },
  wrapperButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
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
  select: {
    backgroundColor: colors.input,

    padding: 8,
  },
  wrapperprofilePenghutang: {
    backgroundColor: colors.primary,
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
});
