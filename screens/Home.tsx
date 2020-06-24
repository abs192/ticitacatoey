import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TButton from '../components/TButton';
import TModal from '../components/TModal';
import PlayComputerModal from '../components/modals/PlayComputerModal'
import PlayHumanModal from '../components/modals/PlayHumanModal'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {

    const [showModal, setShowModal] = useState(false);
    const [playComputerModalFlag, setPlayComputerModalFlag] = useState(false);


    const onSettingsClicked = () => {
        navigation.navigate('Settings')
    };

    const onComputerEasyClicked = () => {
        setShowModal(false)
        navigation.navigate('Game', { isOnlineGame: false, hostGame: true, boardSize: 3, playerCount: 2 })
    };
    const onComputerHardClicked = () => {
        setShowModal(false)
        navigation.navigate('Game', { isOnlineGame: false, hostGame: true, boardSize: 3, playerCount: 2 })

    };
    const onHumanHostClicked = () => {
        setShowModal(false)
        // TODO: take input 
        navigation.navigate('Game', { isOnlineGame: true, hostGame: true, boardSize: 3, playerCount: 2 })
    };
    const onHumanSearchClicked = () => {
        setShowModal(false)
    };

    const onComputerClicked = () => {
        setPlayComputerModalFlag(true)
        setShowModal(true)
    };

    const onHumanClicked = () => {
        setPlayComputerModalFlag(false)
        setShowModal(true)
    };

    return (
        <View style={styles.container}>
            <TModal animationType='slide' transparent={true} visible={showModal} dismiss={() => setShowModal(false)}>
                <View style={styles.modalContent}>
                    {playComputerModalFlag ? <PlayComputerModal onEasyClicked={onComputerEasyClicked} onHardClicked={onComputerHardClicked} /> :
                        <PlayHumanModal onHostClicked={onHumanHostClicked} onSearchClicked={onHumanSearchClicked} />}
                </View>
            </TModal>
            <View style={styles.header}>
                <TouchableOpacity style={styles.settingsIcon} onPress={onSettingsClicked}>
                    <Ionicons name="md-settings" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.titleText}>Tici Taca Toey</Text>
            </View>
            < View style={styles.body}>
                <TButton text="Play vs computer" onPress={onComputerClicked} />
                <TButton text="Play vs Human" onPress={onHumanClicked} />
            </ View>
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#eee',
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
    settingsIcon: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 6,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderColor: 'black',
    },
    modalContent: {
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
});
