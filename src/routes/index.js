import React from 'react';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
    Call,
    Photo,
    Status,
    Discussion,
} from '../screens';
import { View } from 'react-native';
import { Colors, Text } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabApp () {
  return (
    <Tab.Navigator
        initialRouteName="Discussion"
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
        <Tab.Screen name="Discussion" component={Discussion} />
        <Tab.Screen name="Status" component={Status} />
        <Tab.Screen name="Call" component={Call} />
    </Tab.Navigator>
  );
}

function App () {
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                height: 60,
                paddingHorizontal: 15,
                backgroundColor: 'rgb(7, 94, 84)',
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>
                        WhatsApp
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingRight: 2, color: Colors.brown200 }}>
                            <IconMI
                                size={30}
                                name="search"
                                color={Colors.white}
                            />
                        </Text>
                        <Text style={{ paddingLeft: 2, color: Colors.brown200 }}>
                            <IconMC
                                size={28}
                                name="dots-vertical"
                                color={Colors.white}
                            />
                        </Text>
                    </View>
                </View>
            </View>

            <TabApp/>
        </View>
    )
}

export default App;