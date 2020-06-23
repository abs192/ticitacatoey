import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function TButton({text, onPress}) { 
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: { 
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderWidth: 2,
        margin: 16,
        minHeight: 125,
        elevation: 3,
        backgroundColor: "#fff",
        shadowColor: '#111',
        shadowOpacity: 1,
        shadowRadius: 3,
        borderColor: '#EEE',
        justifyContent:'center',
    },
    buttonText: {
        color: '#777',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 18,
        textAlign: 'center',
    },
});