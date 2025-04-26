import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userToken ? (
                    <Stack.Screen name="Home">
                        {props => (
                            <HomeScreen {...props} setUserToken={setUserToken} />
                        )}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="Login">
                            {props => (
                                <LoginScreen {...props} setUserToken={setUserToken} />
                            )}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
