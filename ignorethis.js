




/* get the variables from the text input

*/

states{
    allItems = null
}
//This goes in the render
                        <View>
                            <Text style={styles.inputTitle}>Want or Need?</Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                onChangeText={cat => this.setState({ cat })}
                                value= {this.state.cat}
                            ></TextInput>
                        </View>
                        <View>
                        <Text style={styles.inputTitle}>Item</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={item => this.setState({ item })}
                            value= {this.state.item}
                        ></TextInput>
                       </View>
                        <View>
                        <Text style={styles.inputTitle}>Price</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={price => this.setState({ price })}
                            value= {this.state.price}
                        ></TextInput>
                    </View>  
                        <View>
                        <Text style={styles.inputTitle}>Place</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={place => this.setState({ place })}
                            value= {this.state.place}
                        ></TextInput>
                    </View>                     


// upload on button
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
}


// goes in the render

<Button title = "Enter Receipts" onPress={this.enterReceipt} />
<Button title = "Get Receipts" onPress={this.getReceipts} />

//print out the array



