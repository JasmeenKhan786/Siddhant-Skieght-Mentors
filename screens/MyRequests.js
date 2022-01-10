import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import PdfReader from 'rn-pdf-reader-js';

export default class MyRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: '',
      modalvisible: false,
      mentee: [],
    };
  }
  acceptedMentees = (
    mentorName,
    mentorEmail,
    menteeEmail,
    menteeName,
    industry
  ) => {
    db.collection('acceptedMentees').add({
      mentorName: mentorName,
      mentorEmail: mentorEmail,
      menteeName: menteeName,
      menteeEmail: menteeEmail,
      industry: industry,
    });
  };
  updateStatus(id, status) {
    db.collection('request').doc(id).update({ status: status });
    this.getMentees();
  }

  getMentees = async () => {
    this.setState({ mentee: [] });
    var resp = await db
      .collection('request')
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
            No requests Found{' '}
          </Text>
         
        </View>
         </ImageBackground>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#121212',
          }}>
          <ImageBackground
            source={require('../assets/design.png')}
            style={{ flex: 1, resizeMode: 'cover' }}>

             <Text style={{color:'white', fontSize:22, fontWeight:'bold', marginTop:'15%', alignSelf:'center',marginRight:25,}}>My Requests</Text>
            <ScrollView>
              {this.state.mentee.map((b) => {
                var component;
                if (b.status === 'Pending') {
                  component = (
                    <View style={{width:'100%', flexDirection:'row', marginTop:10, justifyContent:'space-evenly', alignItems:'center'}}>
                      <TouchableOpacity
                        style={{
                          width: '40%',
                          height: 30,
                          backgroundColor: 'green',
                          alignSelf: 'center',
                          justifyContent:'center',
                          borderRadius: 10,
                          shadowOffset: {
                            width: 5,
                            height: 5,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 5,
                        }}
                        onPress={() => {
                          this.updateStatus(b.id, 'Accepted');
                          this.acceptedMentees(
                            b.mentorName,
                            b.mentorEmail,
                            b.menteeEmail,
                            b.menteeName,
                            b.industry
                          );
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                          }}>
                          Accept 
                        </Text> 
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: '40%',
                          height: 30,
                          justifyContent:'center',
                          backgroundColor: 'red',
                          alignSelf: 'center',
                          borderRadius: 10,
                          shadowOffset: {
                            width: 5,
                            height: 5,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 5,
                        }}
                        onPress={() => {
                          this.updateStatus(b.id, 'Rejected');
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                          }}>
                          Reject
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  component = (
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        {b.status}
                      </Text>
                    </View>
                  );
                }

                return (
                  <View
                  key={b.id}
                    style={{
                      width: '80%',
                      height: 140,
                      alignSelf: 'center',
                      backgroundColor: '#ffffff',
                      borderRadius: 10,
                      marginTop: '15%',
                      justifyContent:'center',
                      alignItems:'center',
                      shadowOffset: {
                        width: 10,
                        height: 10,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 5,
                      shadowColor: '#000',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      {b.menteeName}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}>
                      {b.menteeEmail}
                    </Text>

                    <TouchableOpacity
                      style={{
                        width: '32%',
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
                      }}
                      onPress={() => {
                        this.setState({ doc: b.menteeSOP, modalvisible: true });
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          alignSelf: 'center',
                          fontWeight: 'bold',
                          
                        }}>
                        Open S.O.P
                      </Text>
                    </TouchableOpacity>
                    {component}
                  </View>
                );
              })}
            </ScrollView>
          </ImageBackground>

          <Modal visible={this.state.modalvisible}>
            <View style={{ flex: 1, marginTop: 50 }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => {
                  this.setState({ modalvisible: false });
                }}>
                <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                  Close
                </Text>
              </TouchableOpacity>
              {this.state.doc ? (
                <PdfReader
                  source={{
                    uri: this.state.doc,
                  }}
                />
              ) : (
                <Text>The document does not exist</Text>
              )}
            </View>
          </Modal>
        </View>
      );
    }
  }
}
