import { Game, Player, MessageTypes, GameStatus } from '../game/model';

abstract class GameManager {

    EMPTY = "-";
    EMPTY_CELL = "-";
    game: Game;
    player: Player;
    xo: string;
    xoMap: {};
    playerRegisteredCallback: Function;
    gameStartCallback: Function;
    gameWaitingCallback: Function;
    moveMadeCallback: Function;

    constructor(playerName: string, playerRegisteredCallback: Function, gameStartCallback: Function, gameWaitingCallback: Function, moveMadeCallback: Function) {
        this.game = new Game();
        this.xo = "x";
        this.xoMap = {};
        this.player = { name: playerName, playerId: "" };
        this.playerRegisteredCallback = playerRegisteredCallback;
        this.gameStartCallback = gameStartCallback;
        this.gameWaitingCallback = gameWaitingCallback;
        this.moveMadeCallback = moveMadeCallback;
    }


    abstract connect();

    /**
     * Replaces playerIds in game.positions with x's and o's
     */
    getData(): string[][] {
        console.log(this.game.positions)
        console.log(this.xoMap)

        let data = this.game.positions.map(k => k.map(i => {
            console.log(i)
            if (i != this.EMPTY) {
                return this.EMPTY_CELL
            } else {
                return this.xoMap[i] ? this.xoMap[i] : i
            }
        }))

        console.log(data)
        return data
    }

    abstract makeMove(key: number[]);

    abstract registerPlayer();

    abstract startGame(startGameInput);

    abstract gameEnd();

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

export default GameManager;