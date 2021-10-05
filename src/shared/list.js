import React, { memo } from 'react';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { TouchableOpacity, Image, Text, View, ScrollView } from 'react-native';

export const List = memo(({ children, styleScrollView, styleContainer, ...rest }) => {
    return (
        <View style={{ flex: 1, ...styleContainer }} {...rest}>
            <ScrollView style={styleScrollView}>
                {children}
            </ScrollView>
        </View>
    )
})

export const Item = memo(props => {
    const { index, user, selected, renderFirstItem, hasAlreadyBeenSeen, ...rest } = props;

    if (renderFirstItem && index === 0) {
        return renderFirstItem(
            user, selected, rest
        );
    }
    
    return <ItemElement {...props} />
})

export const ItemElement = memo(({ index, user, selected, renderFirstItem, hasAlreadyBeenSeen, isRecentUpdate, isUpdateView, ...rest }) => (
    <>
        <TouchableOpacity
            {...rest}
            style={{
                height: 70,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                backgroundColor: selected ? Colors.grey300 : 'transparent',
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ItemImage
                    item={user}
                    selected={selected}
                    hasAlreadyBeenSeen={hasAlreadyBeenSeen}
                />

                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontWeight: '500', fontSize: 18, color: Colors.black }}>
                        {user.name}
                    </Text>
                    <Text>
                        {user.title}
                    </Text>
                </View>
            </View>

            <View>
                <Text style={{ fontWeight: '400', fontSize: 12 }}>
                    02:43
                </Text>
            </View>
        </TouchableOpacity>

        {isRecentUpdate && (
            <LabelStatus
                label="Récentes mises à jour"
            />
        )}
        {isUpdateView && (
            <LabelStatus
                label="Mises à jour vues"
            />
        )}
    </>
))

export const LabelStatus = memo(({ label }) => (
    label && <View
        style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors.grey300,
        }}
    >
        <Text style={{ fontWeight: '700' }}>
            {label}
        </Text>
    </View>
))

export const ItemImage = memo(({ item, selected, hasAlreadyBeenSeen }) => {
    return (
        <View
        >
            <View
                style={{
                    padding: 2,
                    borderWidth: 2,
                    borderRadius: 100,
                    borderColor: hasAlreadyBeenSeen ? Colors.green500 : Colors.grey500,
                }}
            >
                <Image
                    source={{ uri: item.avatarUrl }}
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                />
            </View>
            {selected && (
                <Icon
                    size={20}
                    name="check"
                    color={Colors.white}
                    style={{
                        right: -2,
                        bottom: 2,
                        borderRadius: 100,
                        position: 'absolute',
                        backgroundColor: Colors.green600,
                    }}
                />
            )}
        </View>
    )
})