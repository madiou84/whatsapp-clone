import React from 'react';
import { Image, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
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

function LogoTitle ({ route, navigation }) {
    const { user } = route.params;
    console.log(user);

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 40, height: 40, borderRadius: 100 }}>
                <Image
                    source={{ uri: user.avatarUrl }}
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                />
            </View>
            <View style={{ marginLeft: 15 }}>
                <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 20 }}>
                    {user.name}
                </Text>
                <Text style={{ color: Colors.white, fontWeight: '500', fontSize: 15 }}>
                    Vue aujourd'hui à 22:04
                </Text>
            </View>
        </View>
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
            <Tab.Screen
                name="DiscussionDetail"
                component={DiscussionDetail}
                options={(props) => ({
                    headerTintColor: '#fff',
                    headerTitle: selfProps => <LogoTitle {...selfProps} {...props} />,
                    headerRight: (props) => (
                        <View style={{ flexDirection: 'row' }}>
                            <IconFA5
                                size={20}
                                name="video"
                                color={Colors.white}
                            />
                            <IconI
                                size={20}
                                name="call"
                                color={Colors.white}
                                style={{ paddingHorizontal: 10 }}
                            />
                            <IconE
                                size={20}
                                color={Colors.white}
                                name="dots-three-vertical"
                            />
                        </View>
                    ),
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: 'rgb(7, 94, 84)',
                    },
                })}
            />
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