import React from "react";
import { StyleSheet, ScrollView, Text, View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';

export default class RegisterScreen extends React.Component {

    state = {
        allItems: null
    };

    enterReceipt = () => {
        fetch("https://femmehacks2021-cd12d-default-rtdb.firebaseio.com/Items.json",{
            method: 'POST',
            body: JSON.stringify({
                cat: cat,
                item: item,
                price: price,
                place: place,
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        })
    }

    getReceipts = () => {
        fetch("https://femmehacks2021-cd12d-default-rtdb.firebaseio.com/Items.json")
        .then(rest => res.json())
        .then(parsedRes => {
            for (const key in parsedRes){
                itemsArray.push({
                    cat: parsedRes[key].cat,
                    item: parsedRes[key].item,
                    price: parsedRes[key].price,
                    place: parsedRes[key]. place,
                    id: key
                })
            }
            this.setState({
                allItems: itemsArray
            })
        })
        .catch(err => console.log(err))

        //print receipts from array
    }


    render() {
        return (
        <View>
            <View>
                <Text>Receipt Screen</Text>
            </View>
            <View>
                <Text style={styles.inputTitle}>Want or Need?</Text>
                <View>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={cat => this.setState({ cat })}
                    value= {this.state.cat}
                ></TextInput>
                </View>
            </View> 
            <View>
                <Text style={styles.inputTitle}>Item</Text>
                <View>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={item => this.setState({ item })}
                    value= {this.state.item}
                ></TextInput>
                </View>
            </View>
            <View>
                <Text style={styles.inputTitle}>Price</Text>
                <View>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={price => this.setState({ price })}
                    value= {this.state.price}
                ></TextInput>
                </View>
            </View>
            <View>
                <Text style={styles.inputTitle}>Place</Text>
                <View>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={place => this.setState({ place })}
                    value= {this.state.cat}
                ></TextInput>
                </View>
            </View>
            <View style = {{marginTop:20}}>
            <Button title = "Enter Receipts" onPress={this.enterReceipt} />
            </View>
            <View style = {{marginTop:20}}>
            <Button title = "Get Receipts" onPress={this.getReceipts} />
            </View>
        </View>   
        )
    }
}