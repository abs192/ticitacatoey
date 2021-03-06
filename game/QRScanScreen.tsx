import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default class ScanScreen extends Component {

    onSuccess = e => {
        console.log(e.data)
        this.props.navigation.navigate('Home', { gameIdToJoin: e.data?.trim() })
    };

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                //TODO: add button to switch on torch
                // flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                    <Text style={styles.centerText}>
                        Scan QR code on your friends game{' '}
                        {/* <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on */}
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => { this.props.navigation.goBack() }}>
                        <Text style={styles.buttonText}>Nevermind, go back!</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});