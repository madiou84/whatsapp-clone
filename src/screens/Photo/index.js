import React from 'react';
import { View, Text } from 'react-native';

export default function PhotoScreen ({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Photo Screen</Text>
      </View>
    );
}

// PhotoScreen.setOptions()