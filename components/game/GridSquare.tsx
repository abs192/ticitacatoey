import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

export default function GridSquare({ xo, psuedoXO, index, onGridSquarePressed }) {

    const onSquarePressed = () => {
        onGridSquarePressed(index)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.textContainer} onPress={onSquarePressed}>
                <Text style={styles.pseudoText}>{psuedoXO}</Text>
                <Text style={styles.text}>{xo}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textContainer: {
        flex: 1,
        fontSize: 50,
        color: '#555',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        borderColor: "#AAA",
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    text: {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        fontSize: 50,
        color: '#555',
        borderRadius: 5,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    pseudoText: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        fontSize: 50,
        color: '#999',
        borderRadius: 5,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
    }
});
