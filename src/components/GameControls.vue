<!-- src/components/GameControls.vue -->
<template>
  <div class="game-controls">
    <!-- 実行中なら Start 無効化、停止中なら Stop 無効化 -->
    <button @click="$emit('start')" :disabled="running">▶️ Start</button>
    <button @click="$emit('stop')"  :disabled="!running">⏸️ Stop</button>
    <button @click="$emit('reset')">🔄 Reset</button>
  </div>
</template>

<script setup lang="ts">
// 実行中フラグを受け取る
const props = defineProps<{
  running: boolean
}>()

// イベント定義
const emit = defineEmits<{
  (e: 'start'): void
  (e: 'stop'): void
  (e: 'reset'): void
}>()
</script>

<style scoped>
.game-controls {
  display: flex;
  gap: 0.5rem;
  margin-top: 1em;
}
button {
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
