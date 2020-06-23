import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

export default function GridSquare({ xo, index, onGridSquarePressed }) {

    const onSquarePressed = () => {
        onGridSquarePressed(index)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.textContainer} onPress={onSquarePressed}>
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
        flex: 1,
        fontSize: 50,
        color: '#555',
        borderRadius: 5,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
    }
});
