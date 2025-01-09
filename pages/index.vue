<template>
    <main>
        <div class="play">
            <Ranks class="rank" :ranks="ranks" />
            <div class="board">
                <Result v-if="checkmate" :positions="positions" />
                <Draw v-if="draw" :drawType="drawType" />
                <Promotion v-if="promotion" :player="turn" :file="promotionFile" :rank="promotionRank"
                    @makePromotion="makePromotion" />
                <div class="row" v-for="(row, rankIndex) in board" :key="rankIndex">
                    <Tile v-for="(tile, fileIndex) in row" :key="fileIndex"
                        :color="((rankIndex + fileIndex) % 2 === 0) ? 'white' : 'black'" @clearMoves="clear"
                        :tile="tile" :file="fileIndex" :rank="rankIndex"
                        :possibleMove="isPossibleMove(rankIndex, fileIndex)" @makeMove="makeMove">
                        <Piece v-if="tile" :piece="tile" @click="getMoves(board, rankIndex, fileIndex, tile)" />
                    </Tile>
                </div>
            </div>
            <Files class="file" :files="files" />
        </div>
        <div class="controls">
            <Notation :positions="positions" />
            <div class="buttons">
                <button @click="takeBack">Take back</button>
                <button @click="resign">Resign</button>
                <button @click="newGame">New Game</button>
            </div>
        </div>
    </main>
</template>

<script>
//Components
import Promotion from "@/components/Promotion.vue";
import Tile from "@/components/Tile.vue";
import Piece from "@/components/Piece.vue";
import Files from "@/components/Files.vue";
import Ranks from "@/components/Ranks.vue";
import Notation from "@/components/Notation.vue";
import Result from "@/components/Result.vue"
import Draw from "@/components/Draw.vue";

//Libraries
import getMoves from "@/lib/frontend/getMove";
import makeMove from "@/lib/frontend/makeMove";
import inCheck from "@/lib/frontend/inCheck";
import isCheck from "@/lib/frontend/isCheck";
import isMate from "@/lib/frontend/isMate";
import isDraw from "@/lib/frontend/isDraw";
import annotation from "@/lib/frontend/annotation";


export default {
    components: { Tile, Piece, Files, Ranks, Promotion, Notation, Result, Draw },
    data() {
        return {
            board: [],
            ranks: [8, 7, 6, 5, 4, 3, 2, 1],
            files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            turn: "w",
            moves: [],
            positions: [],
            notation: [],
            piece: null,
            rank: null,
            file: null,
            promotionFile: null,
            promotionRank: null,
            promotion: false,
            checkmate: false,
            draw: false,
            drawType: null
        };
    },
    methods: {
        createBoard() {
            this.board = [
                ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
                Array(8).fill("bp"),
                Array(8).fill(""),
                Array(8).fill(""),
                Array(8).fill(""),
                Array(8).fill(""),
                Array(8).fill("wp"),
                ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
            ];
            this.positions = [{ turn: 0, notation: "", position: this.board }];
        },
        newGame() {
            this.turn = "w";
            this.positions = [];
            this.checkmate = false;
            this.draw = false
            this.createBoard();
            this.clear();
        },
        getMoves(board, rank, file, piece) {
            if (!piece.startsWith(this.turn)) return;
            const allMoves = getMoves(board, rank, file, piece, this.positions);
            this.moves = allMoves.filter((move) =>
                !inCheck(move, board, rank, file, piece, this.positions)
            );
            this.piece = piece;
            this.rank = rank;
            this.file = file;
        },
        makeMove(file, rank) {
            if (!this.piece || this.file === null || this.rank === null) return;
            if (!this.moves.some((move) => move[0] === rank && move[1] === file)) return;

            const moveData = makeMove(this.piece, this.file, this.rank, file, rank, this.positions, this.board);
            this.board = moveData.board;

            let notation = annotation(
                this.piece,
                file,
                rank,
                this.file,
                this.rank,
                this.positions[this.positions.length - 1].position
            );
            let endNotation = "";

            this.positions.push(moveData.positions)

            if (this.piece.endsWith("p") && ((rank === 0 && this.turn === "w") || (rank === 7 && this.turn === "b"))) {
                this.promotionFile = file;
                this.promotionRank = rank;
                this.positions[this.positions.length - 1].notation = notation;
                this.promotion = true;
                return;
            }

            if (isCheck(this.board, this.turn)) {
                endNotation = "+";
            }
            if (isMate(this.turn, this.board)) {
                this.checkmate = true;
                endNotation = "#";
            }

            this.positions[this.positions.length - 1].notation = notation + endNotation;

            let draw = isDraw(this.board, this.turn, this.positions)

            if (draw.draw) {
                this.draw = true
                this.drawType = draw.type
                this.positions.push({ position: this.board, notation: "1/2 - 1/2", })
            }

            this.turn = this.turn === "w" ? "b" : "w";


            this.clear();
        },
        makePromotion(piece, file, rank) {
            this.board[rank][file] = piece;
            const notation = "=" + piece[1].toUpperCase();
            let endNotation = "";

            if (isMate(this.turn, this.board)) {
                this.checkmate = true;
                endNotation = "#";
            } else if (isCheck(this.board, this.turn)) {
                endNotation = "+";
            }

            this.positions[this.positions.length - 1].notation += notation + endNotation;
            this.turn = this.turn === "w" ? "b" : "w";
            this.clear();
        },
        clear() {
            this.moves = [];
            this.piece = null;
            this.file = null;
            this.rank = null;
            this.promotion = false;
        },
        takeBack() {
            this.checkmate = false;
            if (this.draw) {
                this.draw = false
                this.positions.pop();
            }

            if (this.positions.length === 1) { return; }
            this.positions.pop();
            const lastPosition = this.positions[this.positions.length - 1];
            this.board = lastPosition.position;
            this.turn = lastPosition.turn % 2 === 0 ? "w" : "b";
            this.clear();
        },
        isPossibleMove(rank, file) {
            return this.moves.some((move) => move[0] === rank && move[1] === file);
        },
        resign() {
            this.checkmate = true
        }
    },
    computed() {

    },
    mounted() {
        this.createBoard();
    },
};
</script>



<style scoped>
body {
    margin: 0;
    padding: 0;
}

main {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.play {
    position: relative;
}

.board {
    width: 720px;
    position: relative;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    overflow: hidden;
}

.file {
    position: absolute;
    bottom: -20px;
}

.rank {
    position: absolute;
    left: -20px;
}

.row {
    display: flex;
    flex: 1;
}

.controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 680px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-left: 10px;
}

.buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.buttons button {
    padding: 10px 20px;
    font-size: 1em;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.buttons button:hover {
    background-color: #0056b3;
}

.buttons button:active {
    background-color: #003d80;
}
</style>
