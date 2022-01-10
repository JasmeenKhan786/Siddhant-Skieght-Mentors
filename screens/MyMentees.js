import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class MyMentees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: '',
      modalvisible: false,
      mentee: [],
    };
  }

  getMentees = async () => {
    this.setState({ mentee: [] });
    var resp = await db
      .collection('acceptedMentees')
      .where('mentorEmail', '==', firebase.auth().currentUser.email)
      .get();
    resp.docs.map((d) => {
      var temp = this.state.mentee;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ mentee: temp });
    });
  };

  componentDidMount() {
    this.getMentees();
  }

  render() { 
     if (this.state.mentee.length === 0) {
      return (
         <ImageBackground
            source={require('../assets/design.png')}
            style={{ flex: 1, resizeMode: 'cover' }}>
        <View>
         
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              paddingTop: 5,
              paddingRight: 4,
              fontWeight: 'bold',
              fontSize:18,
              marginTop:200
            }}>
            {' '}
            No Mentees Found{' '}
          </Text>
         
        </View>
         </ImageBackground>
      );
    } else {
    return ( 
      <View
        style={{ 
          flex: 1,
        }}>
        <ImageBackground
          source={require('../assets/design.png')}
          style={{ flex: 1, resizeMode: 'cover' }}>

          <Text style={{color:'white', fontSize:22, fontWeight:'bold', marginTop:'15%', alignSelf:'center'}}>My Mentees</Text>
          <ScrollView>
            {this.state.mentee.map((a) => {
              return (
                <View
                key={a.id}
                  style={{
                    alignSelf: 'center', 
                    borderWidth: 1,
                    borderRadius:10,
                    width: '90%',
                    marginTop: 20,
                    backgroundColor:'#7F7CFF',
                     shadowOffset: {
                width: 5,
                height: 5,
              }, 
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowColor: '#000', 
              elevation:15,
              padding:10
                  }}
                  >
                  <Text style={{color:'#fff',fontWeight:'bold',marginLeft:'5%'}}>{a.menteeName}</Text>
                  <Text style={{color:'#fff',marginLeft:'5%', color:'#ccc'}}>{a.menteeEmail}</Text>
                  <Text style={{color:'#fff',marginLeft:'5%',color:'#ccc'}}>{a.industry}</Text>
                  <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('MenteeAssignments', {
                      menteeName: a.menteeName,
                      menteeEmail: a.menteeEmail,
                    });
                  }}
                  style={{  width: '32%',
                        height: 30,
                        backgroundColor: '#625ED8',
                        alignSelf: 'center',
                        justifyContent:'center',
                        marginTop: 10,
                        borderRadius: 10,
                        shadowOffset: {
                          width: 5,
                          height: 5,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        marginRight: 5,
                      }}><Text   style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        
                      }}>Tasks</Text></TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
}