import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const res = await fetch('http://192.168.0.112:5005/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                await AsyncStorage.setItem('userToken', data.token);
                console.log('Login successful:', data);
                navigation.navigate('Home');
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder='Email'
                onChangeText={setEmail}
                value={email}
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                style={styles.input}
            />
            <Button title={"Login"} onPress={handleLogin}/>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.navigateToLog}>Don't have an account ?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
    },
    navigateToLog: {
        color: 'blue',
        textAlign: 'center',
        padding: 8,
    },
});