<Template>
    <div class="board">
                <div class="row" v-for="(row, rankIndex) in board" :key="rankIndex">
                    <Tile v-for="(tile, fileIndex) in row" :key="fileIndex"
                        :color="((rankIndex + fileIndex) % 2 === 0) ? 'white' : 'black'" @clearMoves="clear"
                        :tile="tile" :file="fileIndex" :rank="rankIndex"
                        :possibleMove="isPossibleMove(rankIndex, fileIndex)" @makeMove="makeMove">
                        <Piece v-if="tile" :piece="tile" @click="getMoves(board, rankIndex, fileIndex, tile)" />
                    </Tile>
                </div>
    </div>
</Template>

<script> 
import Tile from "./Tile.vue";
import Piece from "./Piece.vue";

export default{
    components: {Tile, Piece, },
    data(){
        return{

        }
    }
}
</script>