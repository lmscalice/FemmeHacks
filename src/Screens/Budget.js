import React from "react";
import { AsynchStorage, StyleSheet, ScrollView, Text, View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
    FontAwesome,
  } from '@expo/vector-icons';

export default class RegisterScreen extends React.Component {
    state = {
        income: '',

        rent: '',
        groceries: '',
        utilities:'',
        savings:'',
        debt:'',

        wants:'',
        large_iced_coffee:'',
        movie:'',

    };

    calc = () => {
        var extra = Number(this.state.income) - (Number(this.state.rent) + Number(this.state.debt) + Number(this.state.groceries) + Number(this.state.utilities) + Number(this.state.savings));

        var iced = extra/2;
        var movies = extra/9;


        this.setState({
            wants: extra,
            large_iced_coffe: iced,
            movie:movies
          });
    }

    render() {
        return (
            <ScrollView style = {{backgroundColor: '#fffaf0'}}>
                <Text style={{fontSize: 35, color: "#8fbc8f", alignSelf: 'center', paddingTop:2, paddingBottom:2}}>Budget Calculator</Text>

                <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Monthly Income</Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                onChangeText={income => this.setState({ income })}
                                value= {this.state.income}
                            ></TextInput>
                        </View>

                        <Text style={{paddingTop:10,paddingBottom: 3, fontSize: 20, color: "#8fbc8f", alignSelf: 'center' }}>Necessities</Text>

                        <View>
                            <Text style={styles.inputTitle}> Monthly Rent</Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                onChangeText={rent => this.setState({ rent })}
                                value= {this.state.rent}
                            ></TextInput>
                        </View>

                        <View>
                            <Text style={styles.inputTitle}> Monthly Groceries </Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                onChangeText={groceries => this.setState({ groceries })}
                                value= {this.state.groceries}
                            ></TextInput>
                        </View>

                        <View>
                            <Text style={styles.inputTitle}> Taxes </Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                onChangeText={taxes => this.setState({ taxes })}
                                value= {this.state.taxes}
                            ></TextInput>
                        </View>

                        <View>
                            <Text style={styles.inputTitle}>Debt </Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                onChangeText={debt => this.setState({ debt })}
                                value= {this.state.debt}
                            ></TextInput>
                        </View>

                        <View>
                            <Text style={styles.inputTitle}>Emergency/Savings: </Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                onChangeText={savings => this.setState({ savings })}
                                value= {this.state.savings}
                            ></TextInput>
                        </View>
                </View>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.Button}
                        onPress={() => this.calc()}
                        underLayColor = '#fffaf0' >
                        <FontAwesome name="calculator"
                                style={styles.buttonText}> <Text style={styles.buttonText}> Calculate!</Text>
                    </FontAwesome>
                    </TouchableOpacity>  
                </View> 

                <Text style={{fontSize: 20, color: "#8A8F9E", alignSelf: 'left'}}> {`Money Available for Use: $ ${this.state.wants}`}</Text> 
                
                <Text style={{fontSize: 10, color: "#8A8F9E", alignSelf: 'left'}}> With This Money You Can Buy:</Text> 

                <Text style={{fontSize: 10, color: "#8A8F9E", alignSelf: 'left'}}> {`Number of Iced Coffees ($2/each): $ ${this.state.large_iced_coffee}`}</Text> 
                <Text style={{fontSize: 10, color: "#8A8F9E", alignSelf: 'left'}}> {`Number of Movie Tickets ($9/each): $ ${this.state.movie}`}</Text> 


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Button: {
        paddingBottom:5,
        alignItems: 'center',
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
        fontSize: 20,
        margin: 7
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase",
        paddingTop:5
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    });