import { Game, Player, MessageTypes, GameStatus } from '../game/model';

abstract class GameManager {

    EMPTY = "-";
    EMPTY_CELL = " ";
    game: Game;
    player: Player;
    xo: string;
    xoMap: {};
    playerRegisteredCallback: Function;
    gameHasStartedCallback: Function;
    gameWaitingCallback: Function;
    moveMadeCallback: Function;
    isOnlineGame = false;

    constructor(playerName: string, playerRegisteredCallback: Function, gameHasStartedCallback: Function, gameWaitingCallback: Function, moveMadeCallback: Function) {
        this.game = new Game();
        this.xo = "x";
        this.xoMap = {};
        this.player = { name: playerName, playerId: "" };
        this.playerRegisteredCallback = playerRegisteredCallback;
        this.gameHasStartedCallback = gameHasStartedCallback;
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
            if (i == this.EMPTY || i == this.EMPTY_CELL) {
                return this.EMPTY_CELL
            } else if(this.isOnlineGame){
                return  this.xoMap[i]
            }else{
                return i
            }
        }))

        console.log(data)
        return [...data]
    }

    abstract makeMove(key: number[]);

    abstract registerPlayer();

    abstract startGame(startGameInput);

    abstract joinGame(joinGameInput);

    abstract gameEnd();

    isItMyMoveThough() {
        if (this.game != null && this.game.status == GameStatus.GAME_IN_PROGRESS) {
            if (this.player.playerId == this.game.turn) {
                return true
            }
        }
        return false;
    }

    getToMove() {
        return this.xo;
    }

    switchMove() {
        // TODO: handle for more than 2 players
        if (this.xo == "x") {
            this.xo = "o";
        } else {
            this.xo = "x";
        }
    }

    
    getGameId() {
        if (this.game != null && this.game.gameId != null) {
            return this.game.gameId;
        }
        return ""
    }
}

export default GameManager;