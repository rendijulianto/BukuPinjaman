import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../utils';
import { Gap } from '../../atoms';

const ListPenghutang = ({
  type,
  status,
  onPress,
  name,
  quantity,
  method,
  dateReturn,
  dateCreated,
  avatar,
}) => (
  <TouchableOpacity style={styles.wrapper} onPress={onPress}>
    <View>
      <Image source={avatar} style={styles.avatar} />
    </View>
    <Gap width={10} />
    <View style={styles.wrapper2}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>Jumlah : {quantity}</Text>
        <Text style={styles.desc}>Metode : {method}</Text>
        <Text style={styles.desc}>
          {type === 'home' && <Text>Pengembalian : {dateReturn}</Text>}
          {type === 'history' && (
            <View style={styles.status}>
              <Text>Status : </Text>
              <View style={styles.SpanStatus(status)}>
                <Text style={styles.textStatus(status)}>{status}</Text>
              </View>
            </View>
          )}
        </Text>
        <Gap height={13} />
      </View>
      <View>
        <Text style={styles.date}>{dateCreated}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default ListPenghutang;

const styles = StyleSheet.create({
  avatar: { width: 50, height: 50, borderRadius: 10 },
  wrapper: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 10,
  },
  wrapper2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomColor: colors.border,
    borderBottomWidth: 2,
  },
  name: {
    color: colors.list.name,
    fontSize: 16,
    fontWeight: '600',
  },
  desc: {
    color: colors.list.desc,
    fontSize: 14,
    fontWeight: '300',
  },
  date: {
    color: colors.list.name,
    fontSize: 14,
    fontWeight: '400',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  SpanStatus: (status) => ({
    backgroundColor: status === 'Lunas' ? colors.lunas : colors.belumLunas,
    width: 60,
    height: 20,
    borderRadius: 10,
  }),
  textStatus: (status) => ({
    textAlign: 'center',
    color: status === 'Lunas' ? colors.list.desc : colors.white,
  }),
});
