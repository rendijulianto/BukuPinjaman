import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BottomNavigator } from '../components';
import {
  AddPenghutang,
  EditPenghutang, HistoryPenghutang, Home, Login, Register,
  Splash
} from '../pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => (
  <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
    <Tab.Screen
      name="Utama"
      component={Home}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Tambah"
      component={AddPenghutang}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Daftar"
      component={HistoryPenghutang}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const Router = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MainApp"
      component={MainApp}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="HistoryPenghutang"
      component={HistoryPenghutang}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="EditPenghutang"
      component={EditPenghutang}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default Router;
