import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const HOST = "http://192.168.0.114:5005";

    const validateInputs = () => {
        if (!username || !email || !password) {
            setError('All fields are required');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        setError(null);
        return true;
    }

    const handleRegister = () => {
        if (!validateInputs()) return;

        fetch(`${HOST}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || 'Registration failed');
                }
                Alert.alert('Success', 'User registered successfully', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') },
                ]);
            })
            .catch((err) => {
                console.error('Error registering user:', err);
                setError(err.message || 'An error occurred');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TextInput
                placeholder='Name'
                onChangeText={setUsername}
                value={username}
                style={styles.input}
            />
            <TextInput
                placeholder='Email'
                onChangeText={setEmail}
                value={email}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder='Password'
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                style={styles.input}
            />
            <Button title="Register" onPress={handleRegister} />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navigateToReg}>Already have an account?</Text>
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
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        padding: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 12,
    },
    navigateToReg: {
        color: 'blue',
        textAlign: 'center',
        padding: 8,
    },
});