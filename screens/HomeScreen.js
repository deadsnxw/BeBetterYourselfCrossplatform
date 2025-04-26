import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import GymScreen from '../screens/GymScreen';
import FoodScreen from '../screens/FoodScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ setUserToken }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Gym') iconName = 'barbell-outline';
                    else if (route.name === 'Nutrition') iconName = 'nutrition';
                    else if (route.name === 'Settings') iconName = 'settings';
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Gym" component={GymScreen} />
            <Tab.Screen name="Nutrition" component={FoodScreen} />

            <Tab.Screen name="Settings">
                {props => (
                    <SettingsScreen
                        {...props}
                        setUserToken={setUserToken}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
