import { getDatabase, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { IconClose2 } from '../../../assets';
import { colors, getData, showError, showSuccess } from '../../../utils';
import { Gap } from '../../atoms';

const Profile = () => {
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState({ uri: user.profile });
  const [photoForDB, setPhotoForDB] = useState({ uri: user.profile });
  useEffect(() => {
    getData('user')
      .then((res) => {
        setUser(res);
        console.log('Data : ', res);
      })
      .catch((error) => {
        showError(error.message);
      });
  }, []);
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
          user.photo = photoForDB;
          const db = getDatabase();
          set(ref(db, `users/${user.uid}/`), user)
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error.message);
            });

          showSuccess('Berhasil mengubah foto !!');
        }
      }
    );
  };
  return (
    <TouchableOpacity style={styles.wrapper} onPress={getImageProfile}>
      <View style={styles.borderAvatar}>
        <Image source={photo} style={styles.avatar} />
        <IconClose2 style={styles.iconClose} />
      </View>
      <Gap height={23} />
      <View style={styles.wrapperName}>
        <Text style={styles.name}>{user.fullName}</Text>
        <Gap height={8} />
        <Text style={styles.motivation}>{user.motivation}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Profile;

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
  iconClose: {
    position: 'absolute',
    right: 0,
    top: 15,
  },

  name: {
    fontSize: 25,
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
  },
  motivation: {
    fontSize: 17,
    textAlign: 'center',
    color: colors.white,
  },
});
