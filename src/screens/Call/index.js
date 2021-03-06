import React, { useEffect, useState } from 'react';
import { Colors, FAB, Text } from 'react-native-paper';

import { makeServer } from "../server";
import { List, Item } from '../../shared/list';

if (process.env.NODE_ENV === "development") {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = makeServer();
}

export default function CallScreen ({ navigation }) {
  const [users, setUsers] = useState([]);
  const [serverError, setServerError] = useState();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        data.error ? setServerError(data.error) : setUsers(data.users)
      } catch (error) {
        setServerError(error.message);
      }
    };

    fetchUsers();
  }, [ setUsers ]);

  return (
    <>
      <List>
        {serverError ? (
          <Text testID="server-error">
            {serverError}
          </Text>
        ) : !users ? (
          <Text>
            Loading...
          </Text>
        ) : (
          users.map((user, key) => (
            <Item
              isCall
              index={key}
              user={user}
              key={user.id}
              isMissCall={user.id % 2 === 0}
              isEmitCall={user.id % 2 !== 0}
              isVideoCall={user.id % 8 === 0}
              isReceiveCall={user.id % 3 === 0 && user.id % 11 === 0}
            />
          )
        ))}
      </List>
      
      <FAB
        small
        icon="video-plus"
        color={Colors.lightGreen900}
        onPress={() => console.log('Pressed')}
        style={{
          right: 23,
          bottom: 90,
          position: 'absolute',
          backgroundColor: Colors.grey200,
        }}
      />

      <FAB
        icon="plus"
        color={Colors.white}
        onPress={() => console.log('Pressed')}
        style={{
          right: 16,
          bottom: 16,
          position: 'absolute',
          backgroundColor: Colors.green500,
        }}
      />
    </>
  );
}