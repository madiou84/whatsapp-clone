import React, { memo } from 'react';
import { View } from 'react-native';
import { Text, Colors } from 'react-native-paper';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const WhatsAppHeader = memo(() => {
    return (
        <View style={{ height: 60, paddingHorizontal: 15, backgroundColor: 'rgb(7, 94, 84)' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, }}>
                
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>
                    WhatsApp Clone
                </Text>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingRight: 2 }}>
                        <IconMI
                            size={30}
                            name="search"
                            color={Colors.white}
                        />
                    </Text>
                    
                    <Text style={{ paddingLeft: 2 }}>
                        <IconMC
                            size={28}
                            name="dots-vertical"
                            color={Colors.white}
                        />
                    </Text>
                </View>

            </View>
        </View>
    )
})

export default WhatsAppHeader