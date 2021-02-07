import React from "react";
import { StyleSheet, ScrollView, Text, View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
    FontAwesome,
  } from '@expo/vector-icons';

export default class RegisterScreen extends React.Component {

    render() {
        return (
            <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fffaf0'}}>
                <View>
                <FontAwesome
                  name="money"
                  style={{ color: '#8fbc8f', fontSize: 40, alignItems: 'center'}}
                > <Text style={{ color: '#8fbc8f', fontSize: 40, alignItems: 'center',fontWeight: "100" }}> Budget Buddy</Text> </FontAwesome>
                </View>

                <View>
                    <TouchableOpacity style={styles.homeScreenButton}
                        onPress={() => this.props.navigation.navigate("BudgetScreen")}
                        underLayColor = '#fff' >
                            <Text style={styles.buttonText}>Set Up Your Budget</Text>
                    </TouchableOpacity>  
                </View>  

                <View>
                    <TouchableOpacity style={styles.homeScreenButton}
                        onPress={() => this.props.navigation.navigate("ReceiptScreen")}
                        underLayColor = '#fff' >
                            <Text style={styles.buttonText}>Receipts</Text>
                    </TouchableOpacity>  
                </View>  

            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeScreenButton: {
        marginTop:7,
        alignItems: 'center',
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'#8fbc8f',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width: 200,
        height: 45,
    },
    buttonText:{
        color:'#fffaf0',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize: 17,
        margin: -5
    }
    });