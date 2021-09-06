import React, { useState } from 'react';
import { StyleSheet, TextInput, View, editable } from 'react-native';

import { colors } from '../../../utils';

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  numberic,
  editable,
  select,
  onValueChange,
  selectItem,
}) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.primary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };
  if (select) {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.picker}>
          <Picker selectedValue={value} onValueChange={onValueChange}>
            {selectItem.map((item) => (
              <Picker.Item
                key={item.id}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  }
  return (
    <View>
      <TextInput
        keyboardType={numberic}
        onFocus={onFocusForm}
        style={styles.input(border)}
        onBlur={onBlurForm}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        editable={editable}
      />
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  input: (border) => ({
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 8,
    padding: 8,
  }),
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontWeight: '600',
  },
  picker: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 4,
  },
});
