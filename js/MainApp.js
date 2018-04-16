import React, { Component } from 'react';
import { Alert, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json

import HomeScreen from './HomeScreen'; //memanggil file HomeScreen
import DetailsScreen from './DetailsScreen';
import DataScreen from './DataScreen'; //memanggil file DataScreen
//import FlatList from './FlatList';

export default class MainApp extends React.Component {
  render() {
    return (
      <Screen /> //memanggil TabNavigator Screen
    );
  }
}

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen }, //memanggil class HomeScreen yang ada di file HomeScreen
});

const DataStack = StackNavigator({
  Data: { screen: DataScreen }, //memanggil class DataScreen yang ada di file DataScreen
  Detail: { screen: DetailsScreen },
  //Flat: { screen: FlatList },
});

const Screen =  TabNavigator(
  {
    Home: { screen: HomeStack }, //memanggil stack navigator HomeStack
    Data: { screen: DataStack }, //memanggil stack navigator DataStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Data') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#C51162',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: true,
  }
);
