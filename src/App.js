/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import Router from './router';
import { Fire } from './config';
import store from './redux/store';
import { Loading } from './components';
// import Router from './router';
const MainApp = () => {
  const stateGlobal = useSelector((state) => state);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};
const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);
export default App;
