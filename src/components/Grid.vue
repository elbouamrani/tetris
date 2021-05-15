<template>
    <div class="grid">
        <div class="row" v-for="(row, index) in grid" :key="index">
            <Cell
                v-for="(cell, jndex) in row"
                :key="jndex"
                :cell="cell"
                :coords="{ x: jndex, y: index }"
            />
        </div>
    </div>
</template>

<script>
import Cell from "./Cell";

export default {
    name: "Grid",
    props: ["grid"],
    components: {
        Cell,
    },
};
</script>

<style>
.grid {
    display: inline-block;
    border: 2pt solid black;
}
.row {
    display: flex;
}
</style>