import React, { useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TButton from '../../components/button'

export default function PlayHumanModal({ onHostClicked, onSearchClicked }) {

    return (
        <View style={styles.container}>
            <View style={styles.buttonStyle}>
                <TButton text="Host" onPress={onHostClicked}></TButton>
            </View>
            <View style={styles.buttonStyle}>
                <TButton text="Search" onPress={onSearchClicked}></TButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor:"#556",
        alignContent: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: "#444",
        fontSize: 24,
        alignSelf: 'center',
    },
    buttonStyle: {
        flex: 1,
    },
});
