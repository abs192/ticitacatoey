import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Grid from '../components/grid';
import ToastModal from '../components/modals/ToastModal';
import QRCodeGen from 'react-native-qrcode-generator';
import TModal from '../components/modal';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ThemeColors } from 'react-navigation';
import GameManager from '../game/GameManager';
import OnlineGameManager from '../game/OnlineGameManager';
import OfflineGameManager from '../game/OfflineGameManager';

interface GameScreenProps {
    navigation: any,
    isOnlineGame: boolean,
    hostGame: boolean,
    boardSize: number,
    playerCount: number,
};

interface GameScreenStates {
    boardData: string[][],
    playerName: string,
    isLoading: boolean,
    toastText: string,
    showQR: boolean,
    gameStarted: boolean,
    isYourMove: boolean,
    scanned: boolean,

    //from props
    isOnlineGame: boolean,
    boardSize: number,
    playerCount: number,

};

class GameScreen extends Component<GameScreenProps, GameScreenStates> {

    gameManager: GameManager;

    constructor(props) {
        super(props);
        console.log(this.props);

        let data: string[][] = []

        let boardSize = this.props.navigation.state.params.boardSize;
        for (let i = 0; i < boardSize; i++) {
            data.push([])
            for (let j = 0; j < boardSize; j++) {
                data[i].push(" ")
            }
        }
        this.state = {
            boardData: [...data],
            playerName: "abs", // get from props later
            isLoading: true,
            toastText: "Connecting",
            showQR: false,
            gameStarted: false,
            isYourMove: true,
            isOnlineGame: this.props.navigation.state.params.isOnlineGame,
            boardSize: 3,
            playerCount: 2,
            scanned: false,
        };

        this.onSquareClicked = this.onSquareClicked.bind(this)
        this.playerRegistered = this.playerRegistered.bind(this)
        this.startNewGame = this.startNewGame.bind(this)
        this.gameHasStarted = this.gameHasStarted.bind(this)
        this.gameWaiting = this.gameWaiting.bind(this)
        this.updateYourMove = this.updateYourMove.bind(this)
        this.moveWasMade = this.moveWasMade.bind(this)
        this.gameEnded = this.gameEnded.bind(this)

        // TODO: use factory or some shit
        if (this.state.isOnlineGame) {
            this.gameManager = new OnlineGameManager(this.state.playerName, this.playerRegistered, this.gameHasStarted, this.gameWaiting, this.moveWasMade)
        } else {
            this.gameManager = new OfflineGameManager(this.state.playerName, this.state.boardSize, 2, this.playerRegistered, this.gameHasStarted, this.gameWaiting, this.moveWasMade)
        }
    }

    componentDidMount() {
        console.log('mount')
        this.gameManager.connect()
        // (async () => {
        //     const { status } = await BarCodeScanner.requestPermissionsAsync();
        //     this.setState({
        //         scanned:
        //             (status === 'granted')
        //     })
        // })
    }


    playerRegistered() {
        this.startNewGame()
    }

    startNewGame() {
        // TODO: build from props 
        let startGameInput = {
            name: this.state.playerName,
            boardSize: 3,
            playerCount: 2,
        }
        this.gameManager.startGame(startGameInput)
    }

    gameHasStarted() {
        this.setState({
            gameStarted: true,
            isYourMove: true,
            isLoading: false,
        })
    }

    gameWaiting() {
        //display we waiting
        this.setState({
            toastText: "Waiting for opponent",
        })
    }

    moveWasMade(data: string[][]) {
        console.log("move made ")
        console.log(data)
        console.log(this.state.boardData)

        //TODO: find cleaner way to do this later
        var newData = this.state.boardData
        data.forEach((value, index) => {
            value.forEach((val, i) => {
                newData[index][i] = val
            })
        })

        this.setState({
            boardData: [...newData],
            isLoading: false,
        })
        console.log(this.state.boardData)
    }

    gameEnded() {

    }

    componentDidUpdate() {
        console.log('update')
    }

    onSquareClicked(key: number[]) {
        if (this.state.gameStarted) {
            //psuedo data and data idea
            console.log("pressed " + key)
            this.gameManager.makeMove(key)
        }
    }

    updateYourMove(isItReally: boolean) {
        this.setState({
            isYourMove: isItReally
        })
    }

    handleBarCodeScanned(type, data) {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }

    render() {
        return (
            <View style={styles.container}>
                <ToastModal isLoading={this.state.isLoading} text={this.state.toastText} />
                {/* <BarCodeScanner
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {this.state.scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                )} */}

                <TModal animationType='fade' visible={this.state.showQR} transparent={true} dismiss={() => { this.setState({ showQR: false }) }}>
                    <View style={styles.qrCodeModal}>
                        {/* <QRCodeGen value="abc" /> */}
                        <Text style={styles.qrCodeText}>Scan this QR Code on your friend's app to join</Text>
                    </View>
                </TModal>
                {/* <ToastModal isLoading={this.state.isLoading} /> */}
                <Grid size={3} data={this.state.boardData} onGridSquarePressed={(key) => this.onSquareClicked(key)} />
            </View >
        )
    }
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        flexDirection: 'column',
    },
    qrCodeModal: {
        flexDirection: 'row',
        margin: 20,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
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
    qrCodeText: {
        flex: 1,
        margin: 15,
        fontWeight: 'bold',
        fontSize: 24,
        flexWrap: 'wrap',
    },
});
