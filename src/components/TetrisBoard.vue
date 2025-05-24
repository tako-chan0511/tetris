<template>
  <div class="tetris">
    <!-- スコア表示 -->
    <ScoreDisplay
      :score="score"
      :level="level"
      :lines="lines"
    />

    <!-- メイン盤面 -->
    <div
      class="board"
      @touchstart.prevent="onTouchStart"
      @touchend.prevent="onTouchEnd"
    >
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
  const dg = grid.map(row => [...row])
  const shape = currentShape.value
  for (let dy = 0; dy < shape.length; dy++) {
    for (let dx = 0; dx < shape[dy].length; dx++) {
      if (shape[dy][dx]) {
        const x = currentX.value + dx
        const y = currentY.value + dy
        if (y >= 0 && y < ROWS && x >= 0 && x < COLUMNS) {
          dg[y][x] = currentKey.value
        }
      }
    }
  }
  return dg
})

// キーボード操作ハンドラ
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
      // ソフトドロップが欲しい場合は useTetris に moveDown を追加して呼び出してください
      break
    case ' ':
      e.preventDefault()
      drop()       // スペースでハードドロップ
      break
  }
}

// タッチ操作用
let touchStartX = 0
let touchStartY = 0
let touchStartTime = 0

function onTouchStart(e: TouchEvent) {
  const t = e.touches[0]
  touchStartX = t.clientX
  touchStartY = t.clientY
  touchStartTime = performance.now()
}

function onTouchEnd(e: TouchEvent) {
  if (!isRunning.value) return
  const t = e.changedTouches[0]
  const dx = t.clientX - touchStartX
  const dy = t.clientY - touchStartY
  const dt = performance.now() - touchStartTime

  // 横スワイプで左右移動
  if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) moveRight()
    else moveLeft()
    return
  }
  // 下スワイプでソフトドロップ（1セル）
  if (Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx)) {
    if (dy > 0) drop()
    return
  }
  // タップ or 長押し
  if (dt < 200) {
    // 短タップで回転
    rotate()
  } else {
    // 長押しでハードドロップ
    drop()
  }
}

// ライフサイクルでキー／タッチ操作登録／解除
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
  margin: 0;
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
  margin: 0.5rem auto;
}
</style>
