import { Game, Player, MessageTypes, GameStatus } from '../game/model';
import GameManager from './GameManager';

class OfflineGameManager extends GameManager {

    EMPTY = " ";
    players: string[];
    boardSize: number;
    playerCount: number;

    constructor(playerName: string, boardSize: number, playerCount: number, playerRegisteredCallback: Function, gameStartCallback: Function, gameWaitingCallback: Function, moveMadeCallback: Function) {
        super(playerName, playerRegisteredCallback, gameStartCallback, gameWaitingCallback, moveMadeCallback)
        this.players = [];
        this.boardSize = boardSize;
        this.playerCount = playerCount;
        this.player.playerId = "p1";
    }

    connect() {
        this.game = {
            gameId: "",
            name: "",
            boardSize: this.boardSize,
            positions: this.generateBoard(this.boardSize),
            playerCount: this.playerCount ? this.playerCount : 2,
            players: this.players,
            spectators: [],
            status: GameStatus.GAME_IN_PROGRESS,
            turn: this.xo,
            winner: "",
            winningSequence: ""
        };
        //TODO: generate and randomize this
        this.xoMap = {
            "p1": "x",
            "p2": "o",
        }
        this.gameStartCallback()
    }

    generateBoard(boardSize: number) {
        let data: string[][] = []
        for (let i = 0; i < boardSize; i++) {
            data.push([])
            for (let j = 0; j < boardSize; j++) {
                data[i].push(this.EMPTY)
            }
        }
        return [...data]
    }

    makeMove(key: number[]) {
        let legalMove = false
        let data = this.getData();
        console.log('ues');
        console.log(data);
        if (data[key[0]][key[1]] == this.EMPTY) {
            legalMove = true
        }

        if (legalMove && this.isItMyMoveThough()) {
            const positions = [...this.game.positions];
            positions[key[0]][key[1]] = this.xo;
            this.switchMove()
            this.game = {
                ...this.game,
                positions,
                turn: this.xo,
            };
            this.moveMadeCallback(this.game.positions)
        } else {
            // TODO :use promise reject shit and all
            alert('Invalid move')
        }
    }

    registerPlayer() {
    }

    startGame(startGameInput) {
    }

    gameEnd() {

    }

    isItMyMoveThough() {
        return true;
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

export default OfflineGameManager;