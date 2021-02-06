//import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TextInput } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import Home from './src/Screens/Home'
import Budget from './src/Screens/Budget'
import Receipt from './src/Screens/Receipt'

const AppStack = createStackNavigator({
    HomeScreen: Home,
    BudgetScreen: Budget,
    ReceiptScreen: Receipt,   
});

/*const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});*/

export default createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        //Auth: AuthStack
      },
    )
);