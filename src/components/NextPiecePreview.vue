<!-- src/components/NextPiecePreview.vue -->
<template>
  <div class="preview">
    <!-- 4×4 のミノ格子を、1 回転目（インデックス 0）で描画 -->
    <div
      v-for="(row, y) in matrix"
      :key="y"
      class="preview-row"
    >
      <div
        v-for="(cell, x) in row"
        :key="x"
        :class="['preview-cell', cell ? `color-${shape}` : '']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { ShapeKey } from '@/types/shapes'
import { SHAPES } from '@/types/shapes'

const props = defineProps<{
  /** 次に来るテトロミノのキー ('I','J','L','O','S','T','Z') */
  shape: ShapeKey
}>()

// 最初の回転パターンを取得
const matrix = computed(() => {
  const variants = SHAPES[props.shape]
  if (!variants || !variants.length) {
    // 万が一のフォールバック（全て空セル）
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  }
  return variants[0]
})

// テンプレートで使いやすいように shape を展開
const { shape } = props
</script>

<style scoped>
.preview {
  margin-top: 1em;
  display: inline-block;
}
.preview-row {
  display: flex;
}
.preview-cell {
  width: 24px;
  height: 24px;
  margin: 1px;
  background: #eee;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
/* shape キーに応じた色付け */
.color-I { background: cyan;     }
.color-J { background: blue;     }
.color-L { background: orange;   }
.color-O { background: yellow;   }
.color-S { background: limegreen;}
.color-T { background: purple;   }
.color-Z { background: red;      }
</style>
