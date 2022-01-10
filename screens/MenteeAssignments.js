import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView, 
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
  ImageBackground,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import PdfReader from "rn-pdf-reader-js";
import { AntDesign } from "@expo/vector-icons";

export default class MenteeAssignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: "",
      modalvisible: false,
      assignments: [],
      menteeName: this.props.route.params.menteeName,
      menteeEmail: this.props.route.params.menteeEmail,
      uploading: false,
      userId: firebase.auth().currentUser.email, 
      comments: "",
      modalvisible2: false,
      viewDoc: "", 
    };
  }
 
  getAssignments = async () => {
    this.setState({ assignments: [] });
    var resp = await db
      .collection("assignments")
      .where("menteeEmail", "==", this.state.menteeEmail)
      .get();
    resp.docs.map((d) => {
      var temp = this.state.assignments;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ assignments: temp });
    });
  };
  componentDidMount() {
    this.getAssignments();
  }

  selectPicture = async (path) => {
    this.setState({ uploading: true });
    const { size, name, type, uri } = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: false,
    });

    if (type === "success") {
      this.uploadImage(uri, this.state.userId, path);
    }
  };

  uploadImage = async (uri, imageName, path) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(path + imageName);

    return ref
      .put(blob, {
        contentType: "application/pdf",
      })
      .then((response) => {
        this.fetchImage(imageName, path);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  fetchImage = (imageName, path) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(path + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ doc: url });
      })
      .catch((error) => {
        alert("No Files uploaded yet for this user!");
        this.setState({ doc: "#" });
      });
  };

  addAssignment = async() => {
   
    db.collection("assignments").add({
      menteeEmail: this.state.menteeEmail,
      menteeName: this.state.menteeName,
      assignmentDoc: this.state.doc,
      responseDoc: "",
      status: "Assigned",
      mentorName: firebase.auth().currentUser.displayName,
      mentorEmail: firebase.auth().currentUser.email,
      mentorComments: this.state.comments,
    });
    alert("SuccessFully Assigned!");
    this.setState({
      modalvisible: false,
      comments:''
    });
    this.getAssignments();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          source={require("../assets/design.png")}
          style={{ flex: 1, resizeMode: "cover" }}
        >
          <TouchableOpacity
            style={{ marginLeft: 15, marginTop: '15%' }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
              marginTop: "5%",
              alignSelf: "center",
            }}
          >
            {this.state.menteeName}'s Assignments
          </Text>

          <ScrollView>
            {this.state.assignments.length === 0 ? (
              <View>
                <Text 
                  style={{
                    color: "#fff",
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: 18,
                    marginTop: 200,
                    marginHorizontal: "5%",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Assignments for your Mentee will appear here{" "}
                </Text>
              </View>
            ) : (
              this.state.assignments.map((p) => {
                return (
                  <View
                  key={p.id}
                    style={{
                      borderWidth: 1,
                      marginTop: 15,
                      backgroundColor: "#7F7CFF",
                      width: "80%",
                      alignSelf: "center",
                      borderRadius: 10,
                      shadowOffset: {
                        width: 5,
                        height: 5,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 10,
                      shadowColor: "#000",
                      elevation: 15,
                      padding:10
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: '600',
                        fontFamily: "Comic Sans MS",
                      }}
                    >
                      Comments: {p.mentorComments}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: '600',
                        fontFamily: "Comic Sans MS",
                      }}
                    >
                     Status: {p.status}
                    </Text>

                    <TouchableOpacity
                      style={{
                        width: "70%",
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        height:30,
                        marginTop:10,
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection: "row",
                        alignSelf: "center",
                      }}
                      onPress={() => {
                        if (p.status === "Completed") {
                          this.setState({
                            modalvisible2: true,
                            viewDoc: p.responseDoc,
                          });
                        } else {
                          alert("Mentee Has not Submitted the Assignment Yet");
                        }
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>View Submission</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </ScrollView>

            <TouchableOpacity
              style={{
                width: "60%",
                backgroundColor: "#625ED8",
                height: 40,
                borderRadius: 10,
                alignSelf: "center",
                marginVertical: 10,
                justifyContent:'center',
                alignItems:'center'
              }}
              onPress={() => {
                this.setState({
                  modalvisible: true,
                });
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "center",
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                + Assign Tasks
              </Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalvisible}
            >
              <View
                style={{
                  backgroundColor: "#4740B2",
                  width: "100%",
                  height: 700,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      modalvisible: false,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                      fontSize: 18,
                      marginTop: 15,
                      marginLeft: 15,
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>

                {this.state.uploading === true ? (
                  this.state.doc ? (
                    <Feather
                      style={{
                        alignSelf: "center",
                        marginRight: 10,
                        marginTop: 50,
                      }}
                      name="check-circle"
                      size={24}
                      color="white"
                    />
                  ) : (
                    <ActivityIndicator
                      style={{
                        alignSelf: "center",
                        marginRight: 10,
                        marginTop: 50,
                      }}
                      color="white"
                      size="small"
                    />
                  )
                ) : (
                  <AntDesign
                    style={{
                      alignSelf: "center",
                      marginRight: 10,
                      marginTop: 50,
                    }}
                    name="upload"
                    size={24}
                    color="white"
                  />
                )}

                <TouchableOpacity
                  onPress={() => {
                    this.selectPicture("assignments/" + Math.random());
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: '700',
                      fontFamily: "Comic Sans MS",
                      marginTop: 5,
                      alignSelf: "center",
                      marginRight: 5,
                    }}
                  >
                    Upload Task for this Mentee!
                  </Text>
                </TouchableOpacity>

                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    width: "80%",
                    alignSelf: "center",
                    height: 30,
                    backgroundColor: "#fff",
                    borderColor: "#577BC1",
                    paddingLeft: 15,
                    marginTop: 30,
                    shadowOffset: {
                      width: 5,
                      height: 5,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    shadowColor: "#000",
                    elevation: 15,
                  }}
                  onChangeText={(val) => {
                    this.setState({
                      comments: val,
                    });
                  }}
                />

                <TouchableOpacity 
                  onPress={() => {
                    if(this.state.doc){
                    this.addAssignment();
                 
                  }
                  else{
                    alert('Please upload tasks!')
                  }
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: '700',
                      fontFamily: "Comic Sans MS",
                      marginTop: 25,
                      alignSelf: "center",
                      marginRight: 10,
                    }}
                  >
                    Assign
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal visible={this.state.modalvisible2}>
              <View style={{ flex: 1, marginTop: 50 }}>
                <TouchableOpacity
                  style={{ margin: 10 }}
                  onPress={() => {
                    this.setState({ modalvisible2: false });
                  }}
                >
                  <Text style={{ alignSelf: "center" }}>Close</Text>
                </TouchableOpacity>
                {this.state.viewDoc ? (
                  <PdfReader
                    source={{
                      uri: this.state.viewDoc,
                    }}
                  />
                ) : (
                  <Text>The document does not exist</Text>
                )}
              </View>
            </Modal>
        </ImageBackground>
      </View>
    );
  }
}
