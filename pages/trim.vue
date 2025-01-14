<template>
    <div id="review-container" class="center">
        <div id="board-outer-container" class="center">
            <svg id="evaluation-bar" width="40" height="730" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                <rect id="black-rect" x="0" y="0" width="40" height="365" fill="#000000" />
                <rect id="white-rect" x="0" y="365" width="40" height="365" fill="#ffffff" />
                <text id="white-eval-text" x="20" y="720" fill="#000000" font-size="16" text-anchor="middle">0.0</text>
                <text id="black-eval-text" x="20" y="20" fill="#fff" font-size="16" text-anchor="middle">0.0</text>
            </svg>

            <div id="board-inner-container" class="center">
                <div id="top-player-profile" class="profile">{{ blackPlayer.username }} ({{ blackPlayer.rating }})</div>
                <canvas id="board" width="1280" height="1280"></canvas>
                <div id="bottom-player-profile" class="profile">{{ whitePlayer.username }} ({{ whitePlayer.rating }})
                </div>
            </div>
        </div>

        <div id="review-panel">
            <div id="review-panel-main">
                <div id="review-panel-wrapper">
                    <h1 class="logo" id="review-panel-title">
                        <i class="knight fa-solid fa-chess-knight" style="color: #ffffff"></i> Game Report
                    </h1>
                    <div id="load-type-dropdown-container" class="white">
                        <select v-model="loadType">
                            <option value="pgn">PGN</option>
                            <option value="chesscom">Chess.com</option>
                            <option value="lichess">Lichess.org</option>
                            <option value="json">JSON</option>
                        </select>
                    </div>
                    <div class="gameInputContainer">
                        <textarea v-model="pgnInput" class="white" cols="30" rows="10" spellcheck="false"
                            placeholder="Enter PGN..."></textarea>
                    </div>
                    <div class="gameInputContainer">
                        <textarea v-model="username" class="white" spellcheck="false" maxlength="48"
                            placeholder="Username..."></textarea>
                        <button @click="fetchGames" class="usernameVerifyBtn">
                            <i class="usernameVerifyBtnIcon fa-solid fa-arrow-right contol-icons"
                                style="color: #ffffff"></i>
                        </button>
                    </div>
                    <button @click="handleReview" class="analyse">
                        <i class="mag fa-solid fa-magnifying-glass" style="color: #ffffff"></i>
                        <b>Analyse</b>
                    </button>
                    <progress id="evaluation-progress-bar" :value="progress" max="100"></progress>
                    <b id="status-message">{{ statusMessage }}</b>
                    <b id="secondary-message" class="white">{{ secondaryMessage }}</b>
                    <div id="report-cards" v-if="reportResults">
                        <h2 class="white">Accuracies</h2>
                        <div>
                            <b id="white-accuracy" class="accuracies">{{ reportResults.accuracies.white }}%</b>
                            <b id="black-accuracy" class="accuracies">{{ reportResults.accuracies.black }}%</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            blackPlayer: { username: "Black Player", rating: "?" },
            whitePlayer: { username: "White Player", rating: "?" },
            loadType: "pgn",
            pgnInput: "",
            username: "",
            progress: 0,
            statusMessage: "",
            secondaryMessage: "",
            reportResults: null,
            evaluatedPositions: [],
        };
    },
    methods: {
        async fetchGames() {
            // Fetch games logic here
        },
        async handleReview() {
            if (this.loadType === "json") {
                try {
                    const savedAnalysis = JSON.parse(this.pgnInput);
                    this.blackPlayer = savedAnalysis.players.black;
                    this.whitePlayer = savedAnalysis.players.white;
                    this.reportResults = savedAnalysis.results;
                } catch {
                    this.logAnalysisError("Invalid savefile.");
                }
            } else {
                await this.evaluate();
            }
        },
        async evaluate() {
            this.statusMessage = "Parsing PGN...";
            try {
                const response = await fetch("/api/parse", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pgn: this.pgnInput }),
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                this.evaluatedPositions = result.positions;
                this.statusMessage = "Evaluating positions...";
            } catch (error) {
                this.logAnalysisError(error.message || "Failed to parse PGN.");
            }
        },
        logAnalysisError(message) {
            this.statusMessage = message;
        },
    },
};
</script>

<style>
/* Add styles here */
</style>
