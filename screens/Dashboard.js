 import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  Image, 
  TouchableOpacity,
} from 'react-native';

 
//Array
//Map and ScrollView  
//Flatlist
 
const industry = [
  { id: '01', name: 'MyRequests', image: require('../assets/request.png') },
  { id: '02', name: 'MyMentees', image: require('../assets/mentee.png') },
  { id: '03', name: 'Profile', image: require('../assets/pic.png') },
];

export default class DashboardScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            marginTop: 40, 
            fontFamily: 'Comic Sans MS',
            marginRight:20
          }}>
          Skeight Mentors
        </Text>
        
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#362F41',
            marginTop: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flex:1
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              marginLeft:'3%',
              marginTop: 20,  
              fontWeight:'600',
              alignSelf:'center',
              width:'70%'
            }}>
“The best way to predict the future is to create it.”
          </Text>

          <Text style={{color:'white', marginLeft:'5%', marginTop:30, fontSize:18, fontWeight:'600'}}>A seamless experience</Text>

          <ScrollView>
            {industry.map((a) => {
              return (
                <TouchableOpacity
                key={a.id}
                  style={{
                    width: '80%',
                    height: 150,
                    backgroundColor: 'pink',
                    marginTop: 20,
                    alignSelf: 'center',
                    borderRadius: 10,
                    shadowOffset: {
                      width: 10,
                      height: 10,
                    },
                    shadowOpacity: 0.67,
                    shadowRadius: 10,
                    shadowColor: '#000',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate(a.name)
                  }}>
                  <ImageBackground
                    source={a.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}
