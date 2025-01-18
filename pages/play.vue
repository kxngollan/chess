<template>
    <main>
        <Board :board="board" :blackplayer="blackplayer" :whiteplayer="whiteplayer" />
    </main>
</template>

<script>
import Board from "@/components/board/Board.vue";
import Panel from "@/components/panel/Panel.vue";
import createBoard from "@/lib/frontend/createBoard";


export default {
    component: { Board, Panel },
    data() {
        return {
            board: [],
            whiteplayer: { username: "White Player", rating: "???" },
            blackplayer: { username: "Black Player", rating: "???" },
            flipped: false
        }
    }, methods: {
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
    mounted() {
        this.board = createBoard()
    }
}
</script>

<style></style>