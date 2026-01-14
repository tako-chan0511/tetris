// src/composables/useTetris.ts
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { SHAPES, type ShapeKey } from '@/types/shapes'

type CellValue = ShapeKey | null

function randomShape(): ShapeKey {
  const keys = Object.keys(SHAPES) as ShapeKey[]
  return keys[Math.floor(Math.random() * keys.length)]
}

export function useTetris(columns: number, rows: number) {
  // ─── 状態 ───
  const grid = reactive<CellValue[][]>(
    Array.from({ length: rows }, () => Array(columns).fill(null))
  )

  const currentKey = ref<ShapeKey>(randomShape())
  const currentRot = ref(0)
  const currentX   = ref(Math.floor(columns / 2) - 2)
  const currentY   = ref(0)

  const nextKey = ref<ShapeKey>(randomShape())

  const score        = ref(0)
  const level        = ref(1)
  const linesCleared = ref(0)

  const currentShape = computed(() =>
    SHAPES[currentKey.value][currentRot.value]
  )

  // ─── タイマー／フラグ ───
  let timer: ReturnType<typeof setInterval> | null = null
  const isRunning  = ref(false)
  const isGameOver = ref(false)

  // 衝突判定
  function canPlace(x: number, y: number, rot: number): boolean {
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

  // 新ピーススポーン + ゲームオーバー判定
  function spawnNew() {
    currentKey.value = nextKey.value
    nextKey.value    = randomShape()
    currentRot.value = 0
    currentX.value   = Math.floor(columns / 2) - 2
    currentY.value   = 0

    // ここで置けない＝天井到達→ゲームオーバー
    if (!canPlace(currentX.value, currentY.value, currentRot.value)) {
      isGameOver.value = true
      stop()
      alert('💥 Game Over!')  // 任意でメッセージ
    }
  }

  function clearLines() {
    for (let y = rows - 1; y >= 0; y--) {
      if (grid[y].every((cell: CellValue) => cell !== null)) {
        grid.splice(y, 1)
        grid.unshift(Array(columns).fill(null))
        linesCleared.value++
        score.value += 100 * level.value
        if (linesCleared.value % 10 === 0) level.value++
        y++  // 同じ行を再チェック
      }
    }
  }

  // １ティック
  function tick() {
    if (isGameOver.value) return
    if (canPlace(currentX.value, currentY.value + 1, currentRot.value)) {
      currentY.value++
    } else {
      // 固定
      const shape = currentShape.value
      for (let dy = 0; dy < 4; dy++) {
        for (let dx = 0; dx < 4; dx++) {
          if (shape[dy][dx]) {
            grid[currentY.value + dy][currentX.value + dx] = currentKey.value
          }
        }
      }
      clearLines()
      spawnNew()
    }
  }

  // ─── ゲーム制御 ───
  function start() {
    if (isGameOver.value) return
    if (timer) clearInterval(timer)
    timer = setInterval(tick, Math.max(100, 1000 - (level.value - 1) * 100))
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
    // グリッド初期化
    for (let y = 0; y < rows; y++) {
      grid[y].fill(null)
    }
    score.value        = 0
    level.value        = 1
    linesCleared.value = 0
    isGameOver.value   = false
    spawnNew()
    start()
  }

  // ─── 操作用 ───
  const moveLeft  = () => { if (!isGameOver.value && canPlace(currentX.value - 1, currentY.value, currentRot.value)) currentX.value-- }
  const moveRight = () => { if (!isGameOver.value && canPlace(currentX.value + 1, currentY.value, currentRot.value)) currentX.value++ }
  const rotate    = () => {
    const nr = (currentRot.value + 1) % SHAPES[currentKey.value].length
    if (!isGameOver.value && canPlace(currentX.value, currentY.value, nr)) currentRot.value = nr
  }
  const drop      = () => {
    if (isGameOver.value) return
    while (canPlace(currentX.value, currentY.value + 1, currentRot.value)) {
      currentY.value++
    }
    tick()
  }
 // １セルだけ落とす（ソフトドロップ）
  const moveDown = () => {
    if (canPlace(currentX.value, currentY.value + 1, currentRot.value)) {
      currentY.value++
    }
  }


  // 自動開始／停止
  onMounted(reset)
  onUnmounted(stop)

  return {
    grid,
    currentKey,
    currentShape,
    currentX,
    currentY,
    nextKey,
    score,
    level,
    lines: linesCleared,
    isRunning,
    isGameOver,
    start,
    stop,
    reset,
    moveLeft,
    moveRight,
    rotate,
    drop,
    moveDown,
  }
}
