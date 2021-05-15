<template>
    <div class="cell" :style="{ backgroundColor: cell.color }">
        <!-- {{ coords.x }},{{ coords.y }} -->
    </div>
</template>

<script>
export default {
    name: "Cell",
    props: ["cell", "coords"],
};
</script>

<style>
.cell {
    --cell-size: 10pt;
    width: var(--cell-size);
    height: var(--cell-size);
    border: 1px solid black;
    box-sizing: border-box;
    font-size: 6pt;
}
</style>