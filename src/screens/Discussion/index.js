import { Vibration } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Colors, FAB, Text } from 'react-native-paper';

import { makeServer } from "../server";
import { List, Item } from '../../shared/list';

if (process.env.NODE_ENV === "development") {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = makeServer();
}

export default function Discussion ({ navigation }) {
  let [users, setUsers] = useState([]);
  let [serverError, setServerError] = useState();
  const [hasSelected, setHasSelected] = useState([]);

  useEffect(() => {
    setHasSelected([]);

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

    return () => {
      setHasSelected([]);
    };
  }, [ setUsers, setHasSelected ]);

  const onLongPress = useCallback(
    (user) => {
      if (hasSelected.includes(user.id)) {
        setHasSelected(state => (
          [...state.filter(
            it => it !== user.id
          )]
        ))
      } else {
        setHasSelected(state => ([...state, user.id]))
      }
      
      Vibration.vibrate(45);
    },
    [ hasSelected, setHasSelected ],
  )

  const onPress = useCallback(
    (user) => {
      navigation.navigate('DiscussionDetail', {
        user
      })
    },
    [ navigation ],
  )

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
          users.map(user => (
            <Item
              user={user}
              key={user.id}
              onPress={ () => onPress(user) }
              onLongPress={ () => onLongPress(user) }
              selected={hasSelected.includes(user.id)}
            />
          )
        ))}
      </List>
      
      <FAB
        animated
        icon="android-messages"
        color={Colors.white}
        onPress={() => console.log('Pressed')}
        style={{
          right: 0,
          bottom: 0,
          margin: 16,
          position: 'absolute',
          backgroundColor: Colors.green500,
        }}
      />
    </>
  );
}