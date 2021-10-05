import React, { useEffect, useState } from 'react';
import { Colors, FAB, Text } from 'react-native-paper';

import { makeServer } from "../server";
import { List, Item, ItemElement } from '../../shared/list';
import { View } from 'react-native';

if (process.env.NODE_ENV === "development") {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = makeServer();
}

export default function StatusScreen ({ navigation }) {
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
              user={user}
              index={key}
              key={user.id}
              isUpdateView={user.id === "5"}
              isRecentUpdate={user.id === "2"}
              hasAlreadyBeenSeen={user.id === "3" || user.id === "4" || user.id === "5"}
              renderFirstItem={({ index, selected, renderFirstItem, hasAlreadyBeenSeen }) => (
                <ItemElement
                  user={user}
                  index={index}
                  selected={selected}
                  renderFirstItem={renderFirstItem}
                  hasAlreadyBeenSeen={hasAlreadyBeenSeen}
                />
              )}
            />
          )
        ))}
      </List>
      
      <FAB
        small
        animated
        icon="pencil"
        color={Colors.blueGrey400}
        onPress={() => console.log('Pressed')}
        style={{
          right: 23,
          bottom: 90,
          position: 'absolute',
          backgroundColor: Colors.grey200,
        }}
      />

      <FAB
        animated
        icon="camera"
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