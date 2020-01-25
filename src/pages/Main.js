import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { call } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../service/api';
import { connect, disconnect } from '../service/socket';
import SwitchToggle from "react-native-switch-toggle";



function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            Geolocation.getCurrentPosition(

                (position) => {
                    const { coords } = position;
                    const { latitude, longitude } = coords;
                    setCurrentRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    })
                },
                (error) => {
                    console.log(error.code);
                },
                { enableHighAccuracy: true }

            )

        }
        loadInitialPosition();
    }, []);

    function setupWebSocket(){
        connect();
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;
        const response = await api.get('/search/', {
            params: {
                latitude,
                longitude,
                techs: 'ReactJs'
            }
        });
        setDevs(response.data);
        setupWebSocket();
    }

    async function handleRegionChange(region) {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }
    return (
        <>
         <MapView 
            onRegionChangeComplete={handleRegionChange} 
            /**initialRegion={currentRegion} 
            -37.817531
            144.9501816*/
            initialRegion={{
                latitude: -37.817531,
                longitude: 144.9501816,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}          
            style={styles.map}>
                {devs.map (dev => (
                    <Marker
                        key={dev._id}
                        coordinate={{
                            latitude: dev.location.coordinates[1],
                            longitude: dev.location.coordinates[0]
                        }}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name} </Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    onChangeText={loadDevs}
                    style={styles.searchInput}
                    placeholder="Artist"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFF'
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'column',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2
    },
    toggleCircle: {  
        width: 30,
        height: 30,
        borderRadius: 50,
        marginLeft: 5
    },
    toggleContain: {  
        marginTop: 20,
        width: 70,
        height: 35,
        marginLeft: 300,
        borderRadius: 20,
    }


})

export default Main;

