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
    border: 0.2pt solid #6b6b6b57;
    box-sizing: border-box;
    font-size: 6pt;
}
</style>