<template>
    <div id="app">
        <div class="actions-container">
            <button @click="togglePlay">
                {{ running ? "pause" : "start" }}
            </button>
            <button @click="updateCycle">update</button>
            <button @click="rotateShape">rotate</button>
            <button @click="moveShapeLeft">&lt;</button>
            <button @click="moveShapeRight">&gt;</button>
            <span>x: {{ position.x }} | y: {{ position.y }}</span>
        </div>
        <div class="grid-container" v-if="grid">
            <Grid :grid="paintedGrid" />
        </div>
    </div>
</template>

<script>
import Grid from "./components/Grid.vue";

import TetrisService from "./services/TetrisService";

const DEFAULT_CELL = {
    color: "lightgray",
    type: "empty",
};

export default {
    name: "App",
    components: {
        Grid,
    },
    data() {
        return {
            height: 30,
            width: 20,

            grid: null,
            previewGrid: null,

            shape: null,
            nextShape: null,

            position: { x: 0, y: 0 },

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
                this.grid = TetrisService.placeShape(
                    this.grid,
                    this.shape,
                    this.position
                );

                this.position = this.defaultPosition;
                this.shape = this.nextShape;
                this.nextShape = this.getRandomShape();
            }
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
</style>
