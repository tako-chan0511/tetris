<template>
  <div class="score-display">
    <div class="score-item">
      <span class="label">SCORE</span>
      <span class="value">{{ score }}</span>
    </div>
    <div class="score-item">
      <span class="label">LINES</span>
      <span class="value">{{ lines }}</span>
    </div>
    <div class="score-item">
      <span class="label">LEVEL</span>
      <span class="value">{{ level }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  score: number
  lines: number
  level: number
}>()
</script>

<style scoped>
.score-display {
  display: flex;
  gap:4rem;
  justify-content: space-around;
  background-color: #222;
  color: #eee;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: 'Press Start 2P', cursive;
  user-select: none;
}

.score-item {
  text-align: center;
}

.label {
  display: block;
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 4px;
}

.value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
}
</style>
