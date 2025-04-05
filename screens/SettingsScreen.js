import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error clearing user token:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Button title="Logout" onPress={() => {
                handleLogout();
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
    },
});