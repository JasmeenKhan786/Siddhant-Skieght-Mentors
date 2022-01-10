import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

import firebase from "firebase";
import db from "../config";
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      contact: "",
      skills: "",
      description: "",
      country: "",
      image: "",
      experience:'',
      email: firebase.auth().currentUser.email, 
      id: "",
    };
  }
  getProfile = async () => {
    var temp = await db
      .collection("mentor")
      .where("email", "==", this.state.email)
      .get();

    temp.docs.map((doc) => {
      var obj = doc.data();
      this.setState({ 
        image: obj.image,
        name: obj.name,
        contact: obj.contact,
        skills: obj.skills,
        experience:obj.experience,
        description: obj.description,
        industry:obj.industry,
        country: obj.country,
        id: doc.id,
      });
    });
  };

  componentDidMount = async() => {
    this.getProfile();
  };
  onSubmit = () => { 
    db.collection("mentor").doc(this.state.id).update({
      name: this.state.name,
      contact: this.state.contact,
      industry: this.state.industry,
      description: this.state.description,
      country: this.state.country,
      skills:this.state.skills,
      experience:this.state.experience
    });
    alert('Changes Saved!')
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              margin: 10,
            }}
          >
            <Avatar
              rounded
              size="large"
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/under18-ff13d.appspot.com/o/Assets%2Fbusiness-man.png?alt=media&token=54c37ff7-e1d2-4489-9068-db6165d3dbce",
              }}
            />
          </View>
          <Text
            style={{
              paddingLeft: 40,
              fontWeight: "bold",
              fontFamily: "Comic Sans MS",
            }}
          >
            Contact
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: "80%",
              alignSelf: "center",
              height: 30,
              backgroundColor: "#fff",
              borderColor: "#577BC1",
              paddingLeft: 10,
            }}
            placeholder="9645545676"
            value={this.state.contact}
            onChangeText={(val) => {
              this.setState({ contact: val });
            }}
          />

          <Text
            style={{
              paddingLeft: 40,
              fontWeight: "bold",
              marginTop: 20,
              fontFamily: "Comic Sans MS",
            }}
          >
            Name
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: "80%",
              alignSelf: "center",
              height: 30,
              backgroundColor: "#fff",
              borderColor: "#577BC1",
              paddingLeft: 10,
            }}
            value={this.state.name}
            placeholder="Sid Sethi"
            onChangeText={(val) => {
              this.setState({ name: val });
            }}
          />

          <Text
            style={{
              paddingLeft: 40,
              fontWeight: "bold",
              marginTop: 20,
              fontFamily: "Comic Sans MS",
            }}
          >
            Email
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: "80%",
              alignSelf: "center",
              height: 30,
              backgroundColor: "#fff",
              borderColor: "#577BC1",
              paddingLeft: 10,
            }}
            value={this.state.email}
            placeholder="siddhantsethi@gmail.com"
            editable={false}
          />
          <Text
            style={{
              paddingLeft: 40,
              fontWeight: "bold",
              marginTop: 20,
              fontFamily: "Comic Sans MS",
            }}
          >
            Industry
          </Text>
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              height: 30,
              marginTop: 20,
              fontColor: "grey",
              borderRadius: 10,
              alignSelf:'center',
              justifyContent:'center',
              borderWidth:1, borderColor:'blue'
            }}
          >
            <Picker
              mode="dropdown"
              selectedValue={this.state.industry}
              style={{
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  industry: itemValue,
                })
              }
            >
              <Picker.Item label="INDUSTRY" value="" />
              <Picker.Item label="Technology" value="Technology" />
              <Picker.Item label="Education" value="Education" />
              <Picker.Item label="Social" value="Social" />
              <Picker.Item label="Automobile" value="Automobile" />
              <Picker.Item label="AgriTech" value="AgriTech" />
              <Picker.Item label="Consulting" value="Consulting" />
              <Picker.Item label="Ecommerce" value="Ecommerce" />
              <Picker.Item label="Food" value="Food" />
            </Picker>
          </View>

          <Text
            style={{
              paddingLeft: 40,
              fontWeight: "bold",
              marginTop: 20,
              fontFamily: "Comic Sans MS",
            }}
          >
            Country
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: "80%",
              alignSelf: "center",
              height: 30,
              backgroundColor: "#fff",
              borderColor: "#577BC1",
              paddingLeft: 10,
            }}
            value={this.state.country}
            placeholder="India"
            onChangeText={(val) => {
              this.setState({ country: val });
            }}
          />

          <Text
            style={{
              paddingLeft: 40,
              fontWeight: "bold",
              marginTop: 20,
              fontFamily: "Comic Sans MS",
            }}
          >
            Description
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: "80%",
              alignSelf: "center",
              height: 30,
              backgroundColor: "#fff",
              borderColor: "#577BC1",
              paddingLeft: 10,
            }}
            value={this.state.description}
            placeholder="CEO and Founder Of Mognite."
            onChangeText={(val) => {
              this.setState({ description: val });
            }}
          />

<Text
            style={{
              paddingLeft: 40,
              fontWeight: "bold",
              marginTop: 20,
              fontFamily: "Comic Sans MS",
            }}
          >
            Skills
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: "80%",
              alignSelf: "center",
              height: 30,
              backgroundColor: "#fff",
              borderColor: "#577BC1",
              paddingLeft: 10,
            }}
            value={this.state.skills}
            placeholder="Skills"
            onChangeText={(val) => {
              this.setState({ skills: val });
            }}
          />

<Text
            style={{
              paddingLeft: 40,
              fontWeight: "bold",
              marginTop: 20,
              fontFamily: "Comic Sans MS",
            }}
          >
            Experience
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: "80%",
              alignSelf: "center",
              height: 30, 
              backgroundColor: "#fff",
              borderColor: "#577BC1",
              paddingLeft: 10,
            }}
            value={this.state.experience}
            placeholder="Experience"
            onChangeText={(val) => {
              this.setState({ experience: val });
            }}
          />

          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginTop: 30,
              borderColor: "#1C6DD0",
              borderWidth: 1,
              borderRadius: 5,
              width: "40%",
              backgroundColor: "#1C6DD0",
              padding: 6,
              shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowColor: "#0F00FF",
            }}
            onPress={this.onSubmit}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginTop: 30,
              borderColor: "#1C6DD0",
              borderWidth: 1,
              borderRadius: 5,
              width: "40%",
              backgroundColor: "#1C6DD0",
              padding: 6,
              shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowColor: "#0F00FF",
            }}
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  // Sign-out successful. t
                  this.props.navigation.replace("Login");
                })
                .catch((error) => {
                  // An error happened.
                  alert("Something went wrong! Try later!");

                });
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
  },
  header: {
    width: "100%",
    height: 80,
    paddingTop: 36,
    paddingHorizontal: 20,
    backgroundColor: "#2D46B9",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Comic Sans MS",
    alignSelf: "center",
    alignItems: "center",
    marginRight: 125,
  },
});
