import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Alert, Button } from 'react-native';
import TModal from '../TModal'
import QRCode from 'react-native-qrcode-generator';

const onShareLinkPress = (gameId: string, playerName: string) => {

}

export default function LoadingGameModal({ isLoading, text, showQR, gameId, playerName }) {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const readyToShowQR = (showQR && gameId != "");

    return (
        <TModal animationType='fade' visible={isLoading} transparent={true} >
            <View style={[styles.modalContent,]}>
                <Text style={styles.text}>{text}</Text>
                <View style={styles.qrCodeModal}>
                    {readyToShowQR ?
                        <View>
                            <QRCode value={gameId} />
                            <Text style={styles.qrCodeText}>Scan this QR Code on your friend's app to join</Text>
                        </View>
                        : <></>}
                </View>
                {readyToShowQR ?
                    <Button title={"Share link to join"} onPress={() => { onShareLinkPress(gameId, playerName) }}></Button>
                    : <></>}
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
        fontSize: 24,
        margin: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        padding: 5,
        alignSelf: 'center',
    },
    qrCodeModal: {
        flexDirection: 'row',
        margin: 5,
        padding: 5,
        justifyContent: "center",
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    qrCodeText: {
        flex: 1,
        margin: 15,
        fontWeight: 'bold',
        fontSize: 22,
        flexWrap: 'wrap',
    },
});
