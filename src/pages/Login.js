import React ,{useState} from 'react';
import { View, Text } from 'react-native';
import LoginScreen from "react-native-login-screen";
import api from '../service/api';


function Login({ navigation }) {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const { latitude, longitude } = navigation.getParam('currentRegion')
    async function checkDevs() {
        const response = await api.post('/users/',{
            github_username: username.toLowerCase(),
            password_hash: password,
            latitude,
        	longitude
        }).then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });
        navigation.navigate('Main');
    }
    
    return ( 
    <>
        <LoginScreen
            onPressLogin={() => alert("Login Button is pressed")}
            onPressSettings={() => alert("Settings Button is pressed")}
            onSwitchValueChange={switchValue => setSwitchValue(switchValue)}
            usernameOnChangeText={user => setUsername(user)}
            passwordOnChangeText={pass => setPassword(pass)}
            onPressLogin={checkDevs}
        >

        </LoginScreen>
    </>
    )
}

export default Login;