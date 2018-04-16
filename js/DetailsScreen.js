import React, { Component } from 'react';
import { Alert, RefreshControl, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, FlatList, List, ListItem, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

//Data Screen
class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
        <Image
          source={require('./assets/spiro.png')}
          style={{width: 30, height: 30, tintColor: '#2196F3'  }}
        />
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
      nim: '',
      nama: '',
      bidang: '',
      paruh: '',
      ActivityIndicator_Loading: false,
    };
}

  componentDidMount()  {
    this.setState({
        nim : this.props.navigation.state.params.nim,
        nama: this.props.navigation.state.params.nama,
        bidang: this.props.navigation.state.params.bidang,
        paruh: this.props.navigation.state.params.paruh,
      })

     }

  UpdateRecord = () =>{
      this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('https://intanpebriyanti.000webhostapp.com/api/updateRec.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              nim : this.state.nim,

              nama : this.state.nama,

              bidang : this.state.bidang,

              paruh : this.state.paruh,


            })

            }).then((response) => response.json())
                .then((responseJson) => {
                  this.setState({ ActivityIndicator_Loading : false });
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);

                }).catch((error) => {
                  console.error(error);
                  this.setState({ ActivityIndicator_Loading : false });
                });
        });
      }
DeleteRecord = () =>{
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
          fetch('https://intanpebriyanti.000webhostapp.com/api/deleteRec.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            nim : this.state.nim

          })

          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ ActivityIndicator_Loading : false });
            // Menampilkan pesan yang ada di query
            Alert.alert(responseJson);
            this.props.navigation.navigate('Data');

          }).catch((error) => {
             console.error(error);
             this.setState({ ActivityIndicator_Loading : false });
          });


          });
      }


  render() {
    return (
<KeyboardAvoidingView behavior="padding" style={styles.MainContainer}>

          <Text style={styles.TextHeader}> Edit Data Jadwal Piket</Text>
          <TextInput
            placeholder="Nama Mahasiswa"
            returnKeyType="next"
            value={this.state.nama}
            onChangeText={ TextInputValue => this.setState({ nama : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

         <TextInput
            placeholder="Bidang"
            value={this.state.bidang}
            returnKeyType="next"
            onChangeText={ TextInputValue => this.setState({ bidang : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

         <TextInput
            placeholder="Paruh"
            returnKeyType="next"
            value={this.state.paruh}
            onChangeText={ TextInputValue => this.setState({ paruh : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />


         <TouchableOpacity activeOpacity = { .4 } style={styles.UpdateOpacity} onPress={this.UpdateRecord} >
            <Text style={styles.TextStyle}> UPDATE </Text>
         </TouchableOpacity>
          {
            this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#CFD8DC' size='large'style={styles.ActivityIndicatorStyle} /> : null
          }

         <TouchableOpacity activeOpacity = { .4 } style={styles.DeleteOpacity} onPress={this.DeleteRecord} >
            <Text style={styles.TextStyle}> DELETE</Text>
         </TouchableOpacity>
          {
            this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#CFD8DC' size='large'style={styles.ActivityIndicatorStyle} /> : null
          }

   </KeyboardAvoidingView>

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
      margin: 20

    },

    TextInputStyleClass:
    {
      textAlign: 'center',
      height: 40,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#90A4AE',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },

    BoxClass:
    {
      alignItems: 'flex-start',
      height: 150,
      backgroundColor : "#90A4AE",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: 270,
      paddingTop: 5,
      paddingBottom: 5
    },
    EditClass:
    {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: 30,
      backgroundColor : "#fff",
      borderColor: '#fff',
      borderRadius: 7 ,
      marginTop: 15,
      marginBottom: 1,
      width: 260,
      paddingTop: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },

    TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#2196F3',
      marginBottom: 20,
      width: '70%',
      borderRadius: 7

    },
      DeleteOpacity:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'red',
      marginBottom: 20,
      width: '40%',
      borderRadius: 7

    },
    UpdateOpacity:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#2196F3',
      marginBottom: 20,
      width: '40%',
      borderRadius: 7

    },

    TextStyle:
    {
       color: '#fff',
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
      justifyContent: 'center'

  },
  Header: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextHeader: {
        fontSize: 20,
        color: '#2196F3',
        marginBottom: 7
    },
});
