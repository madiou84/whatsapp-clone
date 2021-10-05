import React from 'react';
import { Colors } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
    Call,
    Photo,
    Status,
    Discussion,
    CallDetail,
    StatusDetail,
    DiscussionDetail,
} from '../screens';
import WhatsAppHeader from '../shared/WhatsAppHeader';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TopTabsNavigator () {
  return (
    <Tab.Navigator
        initialRouteName="Disc."
        screenOptions={{
            tabBarStyle: {
                backgroundColor: 'rgb(7, 94, 84)',
            },
            tabBarLabelStyle: {
                fontWeight: 'bold',
            },
            tabBarActiveTintColor: Colors.white,
            tabBarIndicatorStyle: {
                backgroundColor: Colors.white,
            }
        }}
    >
        <Tab.Screen name="Photo" component={Photo} />
        <Tab.Screen name="Disc." component={Discussion} />
        <Tab.Screen name="Status" component={Status} />
        <Tab.Screen name="Call" component={Call} />
    </Tab.Navigator>
  );
}

function DiscussionStack () {
    return (
        <Stack.Navigator
            initialRouteName="Discussion"
        >
            <Tab.Screen
                name="Discussion"
                component={TopTabsNavigator}
                options={{
                    header: props => (
                        <WhatsAppHeader {...props} />
                    )
                }}
            />
            <Tab.Screen name="CallDetail" component={CallDetail} options={{ headerShown: true }} />
            <Tab.Screen name="StatusDetail" component={StatusDetail} options={{ headerShown: true }} />
            <Tab.Screen name="DiscussionDetail" component={DiscussionDetail} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

function App () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DiscussionStack"
                component={DiscussionStack}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default App;