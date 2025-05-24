import { computed, onMounted, onUnmounted } from 'vue';
import { useTetris } from '@/composables/useTetris';
import TetrisCell from './TetrisCell.vue';
import NextPiecePreview from './NextPiecePreview.vue';
import ScoreDisplay from './ScoreDisplay.vue';
import GameControls from './GameControls.vue';
const COLUMNS = 10;
const ROWS = 20;
// useTetris から必要な状態・操作を受け取る
const { grid, currentKey, currentShape, currentX, currentY, nextKey, score, level, lines, isRunning, start, stop, reset, moveLeft, moveRight, rotate, drop } = useTetris(COLUMNS, ROWS);
// 「グリッド + 現在落下中ミノ」を合成した表示用グリッド
const displayGrid = computed(() => {
    // 元グリッドを深コピー
    const dg = grid.map(row => [...row]);
    const shape = currentShape.value;
    for (let dy = 0; dy < shape.length; dy++) {
        for (let dx = 0; dx < shape[dy].length; dx++) {
            if (shape[dy][dx]) {
                const x = currentX.value + dx;
                const y = currentY.value + dy;
                // 範囲内なら描画
                if (y >= 0 && y < ROWS && x >= 0 && x < COLUMNS) {
                    dg[y][x] = currentKey.value;
                }
            }
        }
    }
    return dg;
});
// キー操作ハンドラ
function handleKey(e) {
    if (!isRunning.value)
        return;
    switch (e.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            rotate();
            break;
        case 'ArrowDown':
            rotate(); // １ステップだけ下に動かす場合は useTetris に moveDown を追加し、ここで呼び出してください
            break;
        case ' ':
            e.preventDefault();
            drop(); // スペースでハードドロップ
            break;
    }
}
// ライフサイクルでキー操作登録／解除
onMounted(() => {
    start();
    window.addEventListener('keydown', handleKey);
});
onUnmounted(() => {
    stop();
    window.removeEventListener('keydown', handleKey);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tetris" },
});
/** @type {[typeof ScoreDisplay, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ScoreDisplay, new ScoreDisplay({
    score: (__VLS_ctx.score),
    level: (__VLS_ctx.level),
    lines: (__VLS_ctx.lines),
}));
const __VLS_1 = __VLS_0({
    score: (__VLS_ctx.score),
    level: (__VLS_ctx.level),
    lines: (__VLS_ctx.lines),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "board" },
});
for (const [cell, idx] of __VLS_getVForSourceType((__VLS_ctx.displayGrid.flat()))) {
    /** @type {[typeof TetrisCell, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(TetrisCell, new TetrisCell({
        key: (idx),
        color: (cell),
    }));
    const __VLS_4 = __VLS_3({
        key: (idx),
        color: (cell),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
/** @type {[typeof NextPiecePreview, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(NextPiecePreview, new NextPiecePreview({
    shape: (__VLS_ctx.nextKey),
}));
const __VLS_7 = __VLS_6({
    shape: (__VLS_ctx.nextKey),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {[typeof GameControls, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(GameControls, new GameControls({
    ...{ 'onStart': {} },
    ...{ 'onStop': {} },
    ...{ 'onReset': {} },
    running: (__VLS_ctx.isRunning),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onStart': {} },
    ...{ 'onStop': {} },
    ...{ 'onReset': {} },
    running: (__VLS_ctx.isRunning),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onStart: (__VLS_ctx.start)
};
const __VLS_16 = {
    onStop: (__VLS_ctx.stop)
};
const __VLS_17 = {
    onReset: (__VLS_ctx.reset)
};
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['tetris']} */ ;
/** @type {__VLS_StyleScopedClasses['board']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TetrisCell: TetrisCell,
            NextPiecePreview: NextPiecePreview,
            ScoreDisplay: ScoreDisplay,
            GameControls: GameControls,
            nextKey: nextKey,
            score: score,
            level: level,
            lines: lines,
            isRunning: isRunning,
            start: start,
            stop: stop,
            reset: reset,
            displayGrid: displayGrid,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=TetrisBoard.vue.js.map