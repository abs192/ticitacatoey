import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TButton from '../components/TButton';

export default function Settings({ navigation }) {

    const onBackClicked = () => { navigation.goBack(null) };
    const onSettingsClicked = () => {   };

    return (
        <View style={styles.container}>
            <Animated.View style={styles.header}>
                <TouchableOpacity style={styles.backIcon} onPress={onBackClicked}>
                    <Ionicons name="md-arrow-round-back" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.titleText}>Settings</Text>
            </Animated.View>
            <Animated.View style={styles.body}>
                <TButton text="Setting 1" onPress={onSettingsClicked}/>
                <TButton text="Setting 2" onPress={onSettingsClicked}/>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'column',
    },
    header: {
        flex: 2,
        borderRadius: 15,
        flexDirection: 'column',
        backgroundColor: '#46e0ff',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#111',
        shadowOpacity: 1,
        shadowRadius: 3,
        borderColor: '#46e0ff',

    },
    body: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleText: {
        flex: 1,
        padding: 10,
        fontSize: 42,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#FFF',
    },
    backIcon: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 6,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderColor: 'black',
    },
});
