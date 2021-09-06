import React from 'react';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { colors } from '../colors';

export const showError = (message) =>
  showMessage({
    message,
    type: 'error',
    color: colors.white,
  });
export const showSuccess = (message) =>
  showMessage({
    message,
    type: 'success',
    color: colors.white,
  });
