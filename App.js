import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import {useEffect, useState} from "react";

const Stack = createStackNavigator();
export default function App() {
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
        };

        checkToken();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userToken ? (
                    <Stack.Screen
                        name='Home'
                        component={HomeScreen}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name='Register'
                            component={RegisterScreen}
                        />
                        <Stack.Screen
                            name='Login'
                            component={LoginScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});