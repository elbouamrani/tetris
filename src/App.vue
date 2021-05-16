<template>
    <div id="app">
        <div class="actions-container">
            <!-- <button @click="togglePlay">
                {{ running ? "pause" : "start" }}
            </button>
            <button @click="updateCycle">update</button>
            <button @click="rotateShape">rotate</button>
            <button @click="moveShapeLeft">&lt;</button>
            <button @click="moveShapeRight">&gt;</button> -->
            <span>cycle: {{ cycle }}</span>
        </div>
        <div class="game-container">
            <div class="grid-container" v-if="grid">
                <Grid :grid="paintedGrid" />
            </div>
            <div class="preview-grid-container" v-if="previewGrid">
                <Grid :grid="paintedPreviewGrid" />
                <button @click="togglePlay">
                    {{ running ? "pause" : "start" }}
                </button>
                <div>cycle: {{ cycle }}</div>
                <div>score: {{ score }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Grid from "./components/Grid.vue";

import TetrisService from "./services/TetrisService";

const DEFAULT_CELL = {
    color: "#eaeaea",
    type: "empty",
};

export default {
    name: "App",
    components: {
        Grid,
    },
    data() {
        return {
            height: 24,
            width: 14,

            grid: null,
            previewGrid: null,

            shape: null,
            nextShape: null,

            position: { x: 0, y: 0 },
            cycle: 0,
            score: 0,

            ticker: null,
            tickerSpeed: 800,
            running: false,

            defaultPosition: {
                x: 0,
                y: 0,
            },
        };
    },
    computed: {
        paintedGrid() {
            return TetrisService.renderShape(
                this.grid,
                this.shape,
                this.position
            );
        },
        paintedPreviewGrid() {
            return TetrisService.renderShape(this.previewGrid, this.nextShape, {
                x: 0,
                y: 0,
            });
        },
    },
    methods: {
        getRandomShape() {
            return TetrisService.tetriminos[
                Math.floor(Math.random() * TetrisService.tetriminos.length)
            ];
        },
        updateCycle() {
            if (!this.running) return;
            const position = TetrisService.shiftShapePosition(
                this.grid,
                this.shape,
                this.position
            );

            if (position) {
                this.position = position;
            } else {
                const result = TetrisService.placeShape(
                    this.grid,
                    this.shape,
                    this.position
                );

                this.grid = result.grid;

                this.score = this.score + result.score;

                this.position = this.defaultPosition;
                this.shape = this.nextShape;
                this.nextShape = this.getRandomShape();
            }

            this.cycle++;
        },
        rotateShape() {
            if (!this.running) return;
            const result = TetrisService.rotateShape(
                this.grid,
                this.shape,
                this.position
            );
            this.shape = result.shape;
            this.position = result.position;
        },
        moveShapeRight() {
            if (!this.running) return;
            const position = TetrisService.shiftShapePosition(
                this.grid,
                this.shape,
                this.position,
                { x: 1, y: 0 }
            );
            // console.log(position);

            if (position) {
                this.position = position;
            }
        },
        moveShapeLeft() {
            if (!this.running) return;
            const position = TetrisService.shiftShapePosition(
                this.grid,
                this.shape,
                this.position,
                { x: -1, y: 0 }
            );

            if (position) {
                this.position = position;
            }
        },
        togglePlay() {
            this.running = !this.running;
        },
        setupTicker() {
            this.ticker = setInterval(() => {
                this.updateCycle();
            }, this.tickerSpeed);
        },
        setupGrid() {
            this.grid = TetrisService.generateGrid(
                this.width,
                this.height,
                DEFAULT_CELL
            );

            this.previewGrid = TetrisService.generateGrid(4, 3, DEFAULT_CELL);
        },
        initGame() {
            this.shape = this.getRandomShape();
            this.nextShape = this.getRandomShape();
        },
        calcDefaultPosition() {
            this.defaultPosition.x = Math.round(this.grid[0].length / 2) - 1;
            this.position = this.defaultPosition;
        },
        registerKeyControls() {
            window.addEventListener("keydown", (e) => {
                switch (e.code) {
                    case "ArrowLeft":
                        this.moveShapeLeft();
                        break;
                    case "ArrowRight":
                        this.moveShapeRight();
                        break;
                    case "ArrowUp":
                        this.rotateShape();
                        break;
                    case "ArrowDown":
                        this.updateCycle();
                        break;
                    case "Space":
                        this.togglePlay();
                        break;
                    default:
                        break;
                }
            });
        },
    },
    mounted() {
        this.setupGrid();
        this.calcDefaultPosition();
        this.initGame();
        this.setupTicker();
        this.registerKeyControls();
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.actions-container {
    margin-bottom: 10pt;
}

.game-container {
    display: flex;
    justify-content: center;
}
.preview-grid-container {
    margin-left: 10pt;
    display: flex;
    flex-direction: column;
}

.preview-grid-container .grid {
    display: inline-block;
    border: 2pt solid lightgray;
    margin-bottom: 5pt;
}

button {
    border: 1pt #08a0d5 solid;
    background-color: #05b6f3;
    border-radius: 1pt;
    text-transform: uppercase;
    color: white;
    font-size: 9pt;
    padding: 3pt;
}
</style>
