import React, { memo } from 'react';
import { Text, Colors } from 'react-native-paper';
import IconI from 'react-native-vector-icons/Ionicons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, Image, View, ScrollView } from 'react-native';

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

export const ItemElement = memo(({
    user,
    index,
    isCall,
    isTime,
    selected,
    isStatus,
    isEmitCall,
    isMissCall,
    isVideoCall,
    isOurStatus,
    isDiscussion,
    isUpdateView,
    isReceiveCall,
    isRecentUpdate,
    renderFirstItem,
    hasAlreadyBeenSeen,
    ...rest
}) => (
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ItemImage
                    item={user}
                    isStatus={isStatus}
                    selected={selected}
                    hasAlreadyBeenSeen={hasAlreadyBeenSeen}
                />

                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontWeight: '700', fontSize: 18, color: Colors.grey700 }}>
                        {user.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {isDiscussion && <>
                            <IconI
                                size={23}
                                color={Colors.blue600}
                                name="md-checkmark-done-sharp"
                            />
                            {user.id % 5 === 0 && <>
                                <IconM
                                    size={20}
                                    name="microphone"
                                    color={Colors.blue600}
                                />
                                <Text style={{ color: Colors.grey500, fontSize: 15, }}>
                                    00:04
                                </Text>
                            </>}
                        </>}
                        {isCall && <>
                            {isMissCall && <IconM
                                size={23}
                                color={Colors.red600}
                                name="arrow-bottom-left"
                            />}
                            {(isReceiveCall || isEmitCall) && <IconM
                                size={23}
                                name="arrow-top-right"
                                color={Colors.green600}
                            />}
                        </>}
                        
                        {user.id % 5 !== 0 && <>
                            <Text style={{ color: Colors.grey500, fontSize: 15, }}>
                                {user.id % 4 === 0 ? `(2) ` : ''} {user.title}
                            </Text>
                        </>}
                    </View>
                </View>
            </View>

            {isOurStatus && <View>
                <IconM
                    size={20}
                    color={Colors.green700}
                    name="dots-horizontal"
                />
            </View>}

            {isCall && <>
                <IconMI
                    size={20}
                    color={Colors.green700}
                    name={isVideoCall ? 'videocam' : 'call'}
                />
            </>}

            {isTime && <View>
                <Text style={{ color: Colors.grey500, fontWeight: '400', fontSize: 12 }}>
                    {user.createdAt.slice(0, -3)}
                </Text>
                {user.id % 6 === 0 && (
                    <IconI
                        size={20}
                        name="volume-mute"
                        color={Colors.grey500}
                    />
                )}
            </View>}
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

export const ItemImage = memo(({ item, selected, isStatus, hasAlreadyBeenSeen }) => {
    return (
        <View
        >
            <View
                style={ isStatus && {
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
                <IconS
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