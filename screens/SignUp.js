import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  Picker,
} from "react-native";

import db from "../config";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
//Users App: (userAccount)
// Name, Contact, Password, Confirm Password, Email, Country

//Mentors App: (mentorAccount)
// Name, Contact, Password, Confirm Password, Email, Country

//400 900 - Custom Size

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",
      industry: "",
    };
  }

  signup = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        alert(
          "Thanks for Joining Skieght.Please Fill Your Profile Details before Proceeding"
        );
        var user = response.user;
        firebase
          .auth()
          .currentUser.updateProfile({ displayName: this.state.name });

        db.collection("mentor").add({
          email: email,
          name: this.state.name,
          image:
            "https://firebasestorage.googleapis.com/v0/b/under18-ff13d.appspot.com/o/Assets%2Fbusiness-man.png?alt=media&token=54c37ff7-e1d2-4489-9068-db6165d3dbce",
          contact: "",
          skills: "",
          description: "",
          country: "",
          experience: "",
          industry: this.state.industry,
        });
        this.props.navigation.replace("Dashboard");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text
            style={{
              marginTop: "15%",
              marginLeft: "5%",
              fontSize: 22,
              fontWeight: "bold",
              color: "blue",
            }}
          >
            Welcome OnBoard 😊
          </Text>

          <Text style={{ marginLeft: "5%", marginTop: 15, color: "grey" }}>
            We are So happy to OnBoard you on our platform. Create An Account to
            Continue.
          </Text>

          <TextInput
            style={{
              backgroundColor: "#ccc",
              marginTop: "10%",
              width: "90%",
              height: 40,
              alignSelf: "center",
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeholder="Name"
            onChangeText={(val) => {
              this.setState({ name: val });
            }}
          />

          <TextInput
            style={{
              backgroundColor: "#ccc",
              marginTop: 20,
              width: "90%",
              height: 40,
              alignSelf: "center",
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeholder="Email"
            onChangeText={(val) => {
              this.setState({ email: val });
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: 30,
              width: "90%",
              height: 40,
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={{
                backgroundColor: "#ccc",
                width: "80%",
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeholder="Password"
              onChangeText={(val) => {
                this.setState({ password: val });
              }}
            />
            <TouchableOpacity
              onPress={() => {
                alert("Coming Soon!");
              }}
              style={{
                borderWidth: 1,
                width: "15%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "blue",
              }}
            >
              <Ionicons name="finger-print" size={24} color="blue" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: "#ccc",
              width: "90%",
              height: 40,
              marginTop: 20,
              fontColor: "grey",
              borderRadius: 10,
              alignSelf:'center',
              justifyContent:'center'
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
          <TouchableOpacity
            onPress={() => {
              if (
                this.state.email &&
                this.state.password &&
                this.state.industry &&
                this.state.name
              ) {
                this.signup(this.state.email, this.state.password);
              } else {
                alert("Please fill all the details!");
              }
            }}
            style={{
              backgroundColor: "blue",
              borderRadius: 10,
              width: "90%",
              height: 40,
              alignSelf: "center",
              marginTop: 80,
              justifyContent: "center",
              elevation: 10,
              shadowOffset: {
                width: 3,
                height: 3,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowColor: "blue",
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <Text
            style={{ alignSelf: "center", marginTop: 40 }}
            onPress={() => {
              this.props.navigation.replace("Login");
            }}
          >
            Already have an Account?{" "}
            <Text style={{ color: "blue", fontWeight: "bold" }}> Login </Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
}
