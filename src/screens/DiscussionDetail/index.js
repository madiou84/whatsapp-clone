import React, { useEffect, useState } from 'react';
import { Colors, FAB, Text, TextInput } from 'react-native-paper';
import { View, useWindowDimensions, ScrollView } from 'react-native';
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

import { makeServer } from "../server";

if (process.env.NODE_ENV === "development") {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = makeServer();
}

export default function DiscussionDetail () {
    const { width } = useWindowDimensions();
    let [users, setUsers] = useState([]);
    let [serverError, setServerError] = useState();
  
    useEffect(() => {
      let fetchUsers = async () => {
        try {
          let res = await fetch("/api/users");
          let data = await res.json();
          data.error ? setServerError(data.error) : setUsers(data.users)
        } catch (error) {
          setServerError(error.message);
        }
      };
  
      fetchUsers();  
    }, [ setUsers ]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.brown100 }}>
            <ScrollView>
                {users.map(user => (
                    <View key={user.id} style={{ alignItems: user.id % 2 === 0 ? 'flex-start' : 'flex-end', padding: 16 }}>
                        <View
                            style={{
                                maxWidth: .8 * width,
                                borderTopRightRadius: 20,
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                backgroundColor: user.id % 2 === 0 ? Colors.white : Colors.lightGreen100,
                            }}
                        >
                            <Text style={{ padding: 10, color: Colors.brown600 }}>
                                {user.title}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingBottom: 5 }}>
                <TextInput
                    autoFocus
                    mode={'outlined'}
                    placeholder="Message"
                    style={{ flex: 1, marginHorizontal: 5 }}
                    right={ <TextInput.Icon name="paperclip" color={Colors.grey600} /> }
                    left={ <TextInput.Icon name="camera" color={Colors.grey600} /> }
                />

                <View
                >
                    <FAB
                        icon="plus"
                        color={Colors.white}
                        style={{ backgroundColor: '#a2a2a2' }}
                    />
                </View>
            </View>
        </View>
    )
}