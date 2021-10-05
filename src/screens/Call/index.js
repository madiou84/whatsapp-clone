import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function CallScreen ({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Call Screen</Text>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('CallDetail') }
          style={{
            padding: 10,
            alignItems: "center",
            backgroundColor: "#DDDDDD",
          }}
        >
          <Text>Go to detail</Text>
        </TouchableOpacity>
      </View>
    );
}