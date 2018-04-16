import React, { Component } from 'react';
import { RefreshControl, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, FlatList, List, ListItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json

//Data Screen
class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{ alignItems: 'center', textAlign: 'center' }}>Jadwal Piket HMJ</Text>
      </View>
    );
  }
}
export default class DataScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false,
    };
}

  componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'https://intanpebriyanti.000webhostapp.com/api/getData.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false,

          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.nim;

  GetIDFunction=(nim, nama, bidang, paruh)=>{

            this.props.navigation.navigate('Detail', {

              nim : nim,
              nama : nama,
              bidang : bidang,
              paruh : paruh,

            });
          }

  render() {
    return (
<View style={ styles.MainContainer }>
      <View style={ styles.Header }>
        <Text style={ styles.TextHeader }> Data Jadwal Piket HMJ </Text>
      </View>
         {
          this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#CFD8DC' size='large'style={styles.ActivityIndicatorStyle} /> : null
          }
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.BoxClass}>
            <Text>NIM : {item.nim}</Text>
              <Text>Nama : {item.nama}</Text>
              <Text>Bidang : {item.bidang}</Text>
              <Text>Jadwal Piket : {item.paruh}</Text>
              <View style={styles.EditClass}>
              <TouchableOpacity
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle }
                  onPress={this.GetIDFunction.bind(
                        this, item.nim,
                         item.nama,
                         item.bidang,
                         item.paruh,
                         )} >
                    <Text style = { styles.TextStyle }>Edit Data</Text>
                </TouchableOpacity>
                </View>
            </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        />


   </View>

    );
  }
}
const styles = StyleSheet.create(
{
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      backgroundColor : '#455A64'

    },

    TextInputStyleClass:
    {
      textAlign: 'center',
      height: 40,
      backgroundColor : "#455A64",
      borderWidth: 1,
      borderColor: '#455A64',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },

    BoxClass:
    {
      alignItems: 'flex-start',
      height: 150,
      backgroundColor : "#2196F3",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: 270,
      paddingTop: 5,
      paddingBottom: 5
    },

    TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#64FFDA',
      marginBottom: 20,
      width: '70%',
      borderRadius: 7

    },

    TextStyle:
    {
       color: '#64FFDA',
        textAlign: 'center',
        fontSize: 18
    },

    ActivityIndicatorStyle:{

      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor : '#E040FB'

  },
  Header: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#E040FB'

    },
    TextHeader: {
        fontSize: 20,
        color: 'black',
        backgroundColor : '#E040FB'

    },
});
