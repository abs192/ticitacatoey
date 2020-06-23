import React from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    Modal,
    View,
} from 'react-native';

export default function TModal(props) {
    return (
        <View>
            <Modal
                visible={props.visible}
                transparent={props.transparent}
                onRequestClose={props.dismiss}
                animationType={props.animationType}>
                <TouchableWithoutFeedback onPress={props.dismiss}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    {props.children}
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
