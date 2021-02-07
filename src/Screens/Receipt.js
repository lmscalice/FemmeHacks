import React from "react";
import { StyleSheet, ScrollView, Text, View, TextInput, ActivityIndicator, TouchableOpacity, Button } from 'react-native';

export default class RegisterScreen extends React.Component {

    state = {
        cat:"",
        item:"",
        price:"",
        place:"",
        allItems: null
    };

    enterReceipt = () => {
        fetch("https://femmehacks2021-cd12d-default-rtdb.firebaseio.com/Items.json",{
            method: 'POST',
            body: JSON.stringify({
                cat: this.state.cat,
                item: this.state.item,
                price: this.state.price,
                place: this.state.place,
            })
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    };

    getReceipts = () => {
        fetch("https://femmehacks2021-cd12d-default-rtdb.firebaseio.com/Items.json")
        .then(res => res.json())
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

            console.log(allItems);
        })
        .catch(err => console.log(err))

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
                    value= {this.state.place}
                ></TextInput>
                </View>
            </View>
            <View style = {{marginTop:20}}>
            <TouchableOpacity style={styles.Button}
                        onPress={() => this.enterReceipt()}
                        underLayColor = '#fffaf0' >
                        <Text>Enter Receipts</Text>
                    </TouchableOpacity>  
            </View>
            <View style = {{marginTop:20}}>
            <TouchableOpacity style={styles.Button}
                        onPress={() => this.getReceipts()}
                        underLayColor = '#fffaf0' >
                        <Text>Get Receipts</Text>
                    </TouchableOpacity> 
            </View>
            
            <Text>`Receipts: ${this.state.allItems}`</Text>
        </View>   
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

    /*
    Code that didn't work for Google Cloud Vision API:
    import React from 'react';
import {
	ActivityIndicator,
	Button,
	Clipboard,
	FlatList,
	Image,
	Share,
	StyleSheet,
	Text,
	ScrollView,
	View
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid'
//import { nanoid } from 'nanoid/non-secure';
import Environment from './config/environment';
import firebase from './config/firebase';

export default class App extends React.Component {
	state = {
		image: null,
		uploading: false,
		googleResponse: null
	};

	async componentDidMount() {
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		await Permissions.askAsync(Permissions.CAMERA);
	}

	render() {
		let { image } = this.state;

		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.getStartedContainer}>
						{image ? null : (
							<Text style={styles.getStartedText}>Google Cloud Vision</Text>
						)}
					</View>

					<View style={styles.helpContainer}>
						<Button
							onPress={this._pickImage}
							title="Pick an image from camera roll"
						/>

						<Button onPress={this._takePhoto} title="Take a photo" />
						{this.state.googleResponse && (
							<FlatList
								data={this.state.googleResponse.responses[0].labelAnnotations}
								extraData={this.state}
								keyExtractor={this._keyExtractor}
								renderItem={({ item }) => <Text>Item: {item.description}</Text>}
							/>
						)}
						{this._maybeRenderImage()}
						{this._maybeRenderUploadingOverlay()}
					</View>
				</ScrollView>
			</View>
		);
	}

	organize = array => {
		return array.map(function(item, i) {
			return (
				<View key={i}>
					<Text>{item}</Text>
				</View>
			);
		});
	};

	_maybeRenderUploadingOverlay = () => {
		if (this.state.uploading) {
			return (
				<View
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: 'rgba(0,0,0,0.4)',
							alignItems: 'center',
							justifyContent: 'center'
						}
					]}
				>
					<ActivityIndicator color="#fff" animating size="large" />
				</View>
			);
		}
	};

	_maybeRenderImage = () => {
		let { image, googleResponse } = this.state;
		if (!image) {
			return;
		}

		return (
			<View
				style={{
					marginTop: 20,
					width: 250,
					borderRadius: 3,
					elevation: 2
				}}
			>
				<Button
					style={{ marginBottom: 10 }}
					onPress={() => this.submitToGoogle()}
					title="Analyze!"
				/>

				<View
					style={{
						borderTopRightRadius: 3,
						borderTopLeftRadius: 3,
						shadowColor: 'rgba(0,0,0,1)',
						shadowOpacity: 0.2,
						shadowOffset: { width: 4, height: 4 },
						shadowRadius: 5,
						overflow: 'hidden'
					}}
				>
					<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
				</View>
				<Text
					onPress={this._copyToClipboard}
					onLongPress={this._share}
					style={{ paddingVertical: 10, paddingHorizontal: 10 }}
				/>

				<Text>Raw JSON:</Text>

				{googleResponse && (
					<Text
						onPress={this._copyToClipboard}
						onLongPress={this._share}
						style={{ paddingVertical: 10, paddingHorizontal: 10 }}
					>
						JSON.stringify(googleResponse.responses)
					</Text>
				)}
			</View>
		);
	};

	_keyExtractor = (item, index) => item.id;

	_renderItem = item => {
		<Text>response: {JSON.stringify(item)}</Text>;
	};

	_share = () => {
		Share.share({
			message: JSON.stringify(this.state.googleResponse.responses),
			title: 'Check it out',
			url: this.state.image
		});
	};

	_copyToClipboard = () => {
		Clipboard.setString(this.state.image);
		alert('Copied to clipboard');
	};

	_takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this._handleImagePicked(pickerResult);
	};

	_pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this._handleImagePicked(pickerResult);
	};

	_handleImagePicked = async pickerResult => {
		try {
			this.setState({ uploading: true });

			if (!pickerResult.cancelled) {
				uploadUrl = await uploadImageAsync(pickerResult.uri);
				this.setState({ image: uploadUrl });
			}
		} catch (e) {
			console.log(e);
			alert('Upload failed, sorry :(');
		} finally {
			this.setState({ uploading: false });
		}
	};

	submitToGoogle = async () => {
		try {
			this.setState({ uploading: true });
			let { image } = this.state;
			let body = JSON.stringify({
				requests: [
					{
						features: [
							//{ type: 'LABEL_DETECTION', maxResults: 10 },
							//{ type: 'LANDMARK_DETECTION', maxResults: 5 },
							////{ type: 'FACE_DETECTION', maxResults: 5 },
							//{ type: 'LOGO_DETECTION', maxResults: 5 },
							{ type: 'TEXT_DETECTION', maxResults: 5 },
							{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
							//{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
							//{ type: 'IMAGE_PROPERTIES', maxResults: 5 },
							//{ type: 'CROP_HINTS', maxResults: 5 },
							//{ type: 'WEB_DETECTION', maxResults: 5 }
						],
						image: {
							source: {
								imageUri: image
							}
						}
					}
				]
			});
			let response = await fetch(
				'https://vision.googleapis.com/v1/images:annotate?key=' +
					Environment['GOOGLE_CLOUD_VISION_API_KEY'],
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: body
				}
			);
			let responseJson = await response.json();
			console.log(responseJson);
			this.setState({
				googleResponse: responseJson,
				uploading: false
			});
		} catch (error) {
			console.log(error);
		}
	};
}

async function uploadImageAsync(uri) {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function() {
			resolve(xhr.response);
		};
		xhr.onerror = function(e) {
			console.log(e);
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});

	const ref = firebase
		.storage()
		.ref()
    .child(uuid.v4()); 
		//.child(nanoid());
	const snapshot = await ref.put(blob);

	blob.close();

	return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingBottom: 10
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center'
	},
	contentContainer: {
		paddingTop: 30
	},

	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50
	},

	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center'
	},

	helpContainer: {
		marginTop: 15,
		alignItems: 'center'
	}
});
*/