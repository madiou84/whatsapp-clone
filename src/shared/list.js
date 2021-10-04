import React from 'react';
import { TouchableOpacity, Image, Text, View, ScrollView } from 'react-native';

export function List ({ children, styleScrollView, styleContainer, ...rest }) {
    return (
        
    <View style={{ flex: 1, ...styleContainer }} {...rest}>
        <ScrollView style={styleScrollView}>
            {children}
        </ScrollView>
    </View>
    )
}

export function Item ({ user, ...rest }) {
    return (
        <View>
            <TouchableOpacity 
                key={user.id}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>    
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                    />

                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            {user.name}
                        </Text>
                        <Text>..</Text>
                    </View>
                </View>

                <View>
                    <Text>
                        02:43
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}