import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FoodScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nutrition</Text>
            <Text style={styles.content}>Welcome to the Nutrition section.</Text>
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