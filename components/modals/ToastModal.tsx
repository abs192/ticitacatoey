import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import TModal from '../modal'

export default function ToastModal({ isLoading, text }) {
    const screenWidth = Math.round(Dimensions.get('window').width);

    return (
        <TModal animationType='fade' visible={isLoading} transparent={true} >
            <View style={[styles.modalContent,]}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TModal >
    );
}

const styles = StyleSheet.create({
    modalContent: {
        margin: 20,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        opacity: 1,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 2,
        alignSelf: 'center',
    },
});
