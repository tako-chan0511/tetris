<!-- src/components/TetrisCell.vue -->
<template>
  <div
    class="cell"
    :class="{
      empty: color === null,
      filled: color !== null
    }"
    :style="cellStyle"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { COLORS, type ShapeKey } from '@/types/shapes'

/**
 * color: テトロミノキー（'I','J','L','O','S','T','Z'）か null
 */
const props = defineProps<{
  color: ShapeKey | null
}>()

// セルのサイズ（px）
const CELL_SIZE = 24

// 色を計算。null なら暗めの背景、キーなら COLORS から取得
const cellStyle = computed(() => ({
  width:  `${CELL_SIZE}px`,
  height: `${CELL_SIZE}px`,
  backgroundColor: props.color
    ? COLORS[props.color]
    : '#111'
}))
</script>

<style scoped>
.cell {
  box-sizing: border-box;
  border: 1px solid #555; /* セルの境界線 */
}

/* empty には特別なスタイルは不要 */
.cell.empty {
  background-color: #111;
}

/* filled には軽い陰影をつけて立体感を演出 */
.cell.filled {
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
}
</style>
