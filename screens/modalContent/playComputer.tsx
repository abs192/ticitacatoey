import React, { useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TButton from '../../components/button'

export default function PlayComputerModal({ onEasyClicked, onHardClicked }) {

    return (
        <View style={styles.container}>
            <View style={styles.buttonStyle}>
                <TButton text="Easy" onPress={onEasyClicked}></TButton>
            </View>
            <View style={styles.buttonStyle}>
                <TButton text="Hard" onPress={onHardClicked}></TButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 15,
        backgroundColor:"#556",
        flexDirection: 'row',
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
