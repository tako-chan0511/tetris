// src/composables/useTetris.ts
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { SHAPES, COLORS, type ShapeKey } from '@/types/shapes'

type CellValue = ShapeKey | null

// ランダムにテトロミノの種類を返す
function randomShape(): ShapeKey {
  const keys = Object.keys(SHAPES) as ShapeKey[]
  return keys[Math.floor(Math.random() * keys.length)]
}

export function useTetris(columns: number, rows: number) {
  // ─── 状態 ───
  const grid = reactive<CellValue[][]>(
    Array.from({ length: rows }, () => Array(columns).fill(null))
  )

  // 現在落下中のテトロミノ
  const currentKey = ref<ShapeKey>(randomShape())
  const currentRot = ref(0)
  const currentX   = ref(Math.floor(columns / 2) - 2)
  const currentY   = ref(0)

  // 次に来るテトロミノ
  const nextKey = ref<ShapeKey>(randomShape())

  // スコア情報
  const score        = ref(0)
  const level        = ref(1)
  const linesCleared = ref(0)

  // 現在のテトロミノ形状 (4x4 行列)
  const currentShape = computed(() =>
    SHAPES[currentKey.value][currentRot.value]
  )

  // ─── 実行中状態 & タイマー ───
  let timer: ReturnType<typeof setInterval> | null = null
  const isRunning = ref(false)

  // 新しいピースをスポーン
  function spawnNew() {
    currentKey.value = nextKey.value
    nextKey.value    = randomShape()
    currentRot.value = 0
    currentX.value   = Math.floor(columns / 2) - 2
    currentY.value   = 0
    // ゲームオーバー判定を追加するならここに
  }

  // 1ティック下に移動 or 固定
  function tick() {
    if (canPlace(currentX.value, currentY.value + 1, currentRot.value)) {
      currentY.value++
    } else {
      mergeCurrentToGrid()
      clearLines()
      spawnNew()
    }
  }

  // ─── ゲーム制御 ───
  function start() {
    if (timer) clearInterval(timer)
    timer = setInterval(
      tick,
      Math.max(100, 1000 - (level.value - 1) * 100)
    )
    isRunning.value = true
  }
  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    isRunning.value = false
  }
  function reset() {
    stop()
    // グリッド全消去
    for (let y = 0; y < rows; y++) {
      grid[y].fill(null)
    }
    score.value        = 0
    level.value        = 1
    linesCleared.value = 0
    // 新ピース
    spawnNew()
  }

  // ─── 衝突判定 & 固定 & ライン消去 ───
  function canPlace(x: number, y: number, rot: number) {
    const shape = SHAPES[currentKey.value][rot]
    for (let dy = 0; dy < 4; dy++) {
      for (let dx = 0; dx < 4; dx++) {
        if (!shape[dy][dx]) continue
        const nx = x + dx, ny = y + dy
        if (
          nx < 0 || nx >= columns ||
          ny < 0 || ny >= rows ||
          grid[ny][nx] !== null
        ) return false
      }
    }
    return true
  }

  function mergeCurrentToGrid() {
    const shape = currentShape.value
    for (let dy = 0; dy < 4; dy++) {
      for (let dx = 0; dx < 4; dx++) {
        if (shape[dy][dx]) {
          grid[currentY.value + dy][currentX.value + dx] = currentKey.value
        }
      }
    }
  }

  function clearLines() {
    for (let y = rows - 1; y >= 0; y--) {
      if (grid[y].every(cell => cell !== null)) {
        grid.splice(y, 1)
        grid.unshift(Array(columns).fill(null))
        linesCleared.value++
        score.value += 100 * level.value
        if (linesCleared.value % 10 === 0) level.value++
        y++ // 再チェック
      }
    }
  }

  // ─── 外部操作用関数 ───
  const moveLeft  = () => {
    if (canPlace(currentX.value - 1, currentY.value, currentRot.value)) {
      currentX.value--
    }
  }
  const moveRight = () => {
    if (canPlace(currentX.value + 1, currentY.value, currentRot.value)) {
      currentX.value++
    }
  }
  const rotate    = () => {
    const nr = (currentRot.value + 1) % SHAPES[currentKey.value].length
    if (canPlace(currentX.value, currentY.value, nr)) {
      currentRot.value = nr
    }
  }
  const drop      = () => {
    while (canPlace(currentX.value, currentY.value + 1, currentRot.value)) {
      currentY.value++
    }
    tick()
  }

  // 自動開始／停止
  onMounted(start)
  onUnmounted(stop)

  return {
    // 状態
    grid,
    currentKey,
    currentShape,
    currentX,
    currentY,
    nextKey,
    // スコア情報
    score,
    level,
    lines: linesCleared,
    isRunning,
    // 操作
    start,
    stop,
    reset,
    moveLeft,
    moveRight,
    rotate,
    drop
  }
}
