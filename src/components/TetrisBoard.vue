<template>
  <div class="tetris">
    <!-- スコア表示 -->
    <ScoreDisplay
      :score="score"
      :level="level"
      :lines="lines"
    />

    <!-- メイン盤面 -->
    <div class="board">
      <TetrisCell
        v-for="(cell, idx) in displayGrid.flat()"
        :key="idx"
        :color="cell"
      />
    </div>

    <!-- 次のピースプレビュー -->
    <NextPiecePreview :shape="nextKey" />

    <!-- ゲームコントロール -->
    <GameControls
      :running="isRunning"
      @start="start"
      @stop="stop"
      @reset="reset"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useTetris } from '@/composables/useTetris'
import TetrisCell       from './TetrisCell.vue'
import NextPiecePreview from './NextPiecePreview.vue'
import ScoreDisplay     from './ScoreDisplay.vue'
import GameControls     from './GameControls.vue'

const COLUMNS = 10
const ROWS    = 20

// useTetris から必要な状態・操作を受け取る
const {
  grid,
  currentKey,
  currentShape,
  currentX,
  currentY,
  nextKey,
  score,
  level,
  lines,
  isRunning,
  start,
  stop,
  reset,
  moveLeft,
  moveRight,
  rotate,
  drop
} = useTetris(COLUMNS, ROWS)

// 「グリッド + 現在落下中ミノ」を合成した表示用グリッド
const displayGrid = computed(() => {
  // 元グリッドを深コピー
  const dg = grid.map(row => [...row])
  const shape = currentShape.value
  for (let dy = 0; dy < shape.length; dy++) {
    for (let dx = 0; dx < shape[dy].length; dx++) {
      if (shape[dy][dx]) {
        const x = currentX.value + dx
        const y = currentY.value + dy
        // 範囲内なら描画
        if (y >= 0 && y < ROWS && x >= 0 && x < COLUMNS) {
          dg[y][x] = currentKey.value
        }
      }
    }
  }
  return dg
})

// キー操作ハンドラ
function handleKey(e: KeyboardEvent) {
  if (!isRunning.value) return
  switch (e.key) {
    case 'ArrowLeft':
      moveLeft()
      break
    case 'ArrowRight':
      moveRight()
      break
    case 'ArrowUp':
      rotate()
      break
    case 'ArrowDown':
      rotate()       // １ステップだけ下に動かす場合は useTetris に moveDown を追加し、ここで呼び出してください
      break
    case ' ':
      e.preventDefault()
      drop()       // スペースでハードドロップ
      break
  }
}

// ライフサイクルでキー操作登録／解除
onMounted(() => {
  start()
  window.addEventListener('keydown', handleKey)
})
onUnmounted(() => {
  stop()
  window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
/* 追加：上下左右中央に */
.tetris {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* ヘッダーとの隙間と、下部との隙間を統一的にあける */
  margin: 0rem;
}

/* スコア表示とボードの隙間を少し詰める */
.board {
  display: grid;
  grid-template-columns: repeat(10, 24px);
  grid-template-rows:    repeat(20, 24px);
  gap: 1px;
  background-color: #120505;
  padding: 4px;
  border-radius: 4px;
  margin: 0.5rem auto; /* ← ここで上下（0.5rem）と左右（auto）を中央寄せ */
}
</style>
