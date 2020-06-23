import { Game, Player, MessageTypes, GameStatus } from '../game/model';
import GameManager from './GameManager';

class OnlineGameManager extends GameManager {

    EMPTY = "-";
    ws: WebSocket | undefined;

    constructor(playerName: string, playerRegisteredCallback: Function, gameStartCallback: Function, gameWaitingCallback: Function, moveMadeCallback: Function) {
        super(playerName, playerRegisteredCallback, gameStartCallback, gameWaitingCallback, moveMadeCallback)
    }

    connect() {
        this.ws = new WebSocket('ws://192.168.0.101:8080')
        this.ws.onopen = () => {
            console.log('ws open')
            this.registerPlayer()
        }
        this.ws.onerror = (data) => console.log('ws error ' + data)
        this.ws.onmessage = ({ data }) => {
            console.log("on message " + data)
            try {
                this.onMessage(JSON.parse(data))
            } catch (Exception) {
            }
        }
    }

    onMessage(obj) {
        switch (obj.type) {
            case MessageTypes.REGISTER_PLAYER:
                {
                    this.player.playerId = obj.playerId;
                    this.playerRegisteredCallback();
                    break;
                }
            case MessageTypes.START_GAME:
                {
                    this.game = obj.game;
                    switch (obj.game.status) {
                        case GameStatus.WAITING_FOR_PLAYERS:
                            this.gameWaitingCallback();
                            break;
                    }
                    break;
                }
            case MessageTypes.JOIN_GAME:
                {
                    this.game = obj.game;
                    switch (obj.game.status) {
                        case GameStatus.GAME_IN_PROGRESS:
                            // TODO: assign random x's and o's
                            this.xoMap[obj.game.players[0]] = 'x';
                            this.xoMap[obj.game.players[1]] = 'o';

                            this.gameStartCallback();
                            break;
                    }
                    break;
                }
            case MessageTypes.MAKE_MOVE:
                {
                    this.game = obj.game;
                    let data = this.getData();
                    this.moveMadeCallback(data);
                    break;
                }
            case MessageTypes.GAME_COMPLETE:
                break;
        }
    }

    makeMove(key: number[]) {
        let legalMove = false
        let data = this.getData();

        console.log(data)

        if (data[key[0]][key[1]] == this.EMPTY) {
            legalMove = true
        }

        if (legalMove && this.isItMyMoveThough()) {
            let boardSize = this.game.boardSize
            console.log("pressed " + key)
            let msg = JSON.stringify({
                type: MessageTypes.MAKE_MOVE,
                gameId: this.game.gameId,
                coordinateX: key[0],
                coordinateY: key[1],
            })
            this.ws?.send(msg)
        } else {
            alert('Invalid move')
        }
    }

    registerPlayer() {
        let msg = JSON.stringify({ type: MessageTypes.REGISTER_PLAYER, ...this.player })
        console.log("registering msg: " + msg)
        this.ws?.send(msg)
    }

    startGame(startGameInput) {
        let msg = JSON.stringify({ type: MessageTypes.START_GAME, ...startGameInput })
        console.log("starting game msg: " + msg)
        this.ws?.send(msg)
    }

    gameEnd() {

    }

    isItMyMoveThough() {
        if (this.game != null && this.game.status == GameStatus.GAME_IN_PROGRESS) {
            if (this.player.playerId == this.game.turn) {
                return true
            }
        }
        return false;
    }

    switchMove() {
        // TODO: handle for more than 2 players
        if (this.xo == "x") {
            this.xo = "o";
        } else {
            this.xo = "x";
        }
    }
}

export default OnlineGameManager;