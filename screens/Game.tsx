import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Grid from '../components/game/Grid';
import LoadingGameModal from '../components/modals/LoadingGameModal';
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
    pseudoBoardData: string[][],
    playerName: string,
    isLoading: boolean,
    toastText: string,
    showQR: boolean,
    gameStarted: boolean,
    isYourMove: boolean,
    gameId: string,
    //from props
    isOnlineGame: boolean,
    boardSize: number,
    playerCount: number,
    hostGame: boolean,

};

class GameScreen extends Component<GameScreenProps, GameScreenStates> {

    gameManager: GameManager;

    constructor(props) {
        super(props);
        console.log(this.props.route.params);

        let data: string[][] = []

        let boardSize = 3;//this.props.navigation.state.params.boardSize;
        for (let i = 0; i < boardSize; i++) {
            data.push([])
            for (let j = 0; j < boardSize; j++) {
                data[i].push(" ")
            }
        }
        this.state = {
            boardData: [...data],
            pseudoBoardData: [...data],
            playerName: "abs", // get from props later
            isLoading: true,
            gameId: "",
            toastText: "Connecting",
            showQR: true,
            gameStarted: false,
            isYourMove: true,
            isOnlineGame: this.props.route.params.isOnlineGame,
            boardSize: this.props.route.params.boardSize,
            playerCount: this.props.route.params.playerCount,
            hostGame: this.props.route.params.hostGame,

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

    gameWaiting(gameId: string) {
        //display we waiting
        this.setState({
            toastText: "Waiting for opponent(s)",
            gameId: gameId
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

            var newData = [...this.state.pseudoBoardData]
            newData[key[0]][key[1]] = this.gameManager.getToMove();

            this.setState({
                pseudoBoardData: [...newData],
            })

            console.log("pressed " + key)
            this.gameManager.makeMove(key)
        }
    }

    updateYourMove(isItReally: boolean) {
        this.setState({
            isYourMove: isItReally
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <LoadingGameModal isLoading={this.state.isLoading} showQR={this.state.showQR}
                    text={this.state.toastText} gameId={this.state.gameId} playerName={this.state.playerName}
                    dismiss={() => {
                        this.setState({
                            isLoading: false,
                        })
                        this.props.navigation.goBack()
                    }} />
                <Grid size={3} data={this.state.boardData} pseudoData={this.state.pseudoBoardData} onGridSquarePressed={(key) => this.onSquareClicked(key)} />
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
});
