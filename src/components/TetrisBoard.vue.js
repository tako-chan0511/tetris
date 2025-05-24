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
    const dg = grid.map(row => [...row]);
    const shape = currentShape.value;
    for (let dy = 0; dy < shape.length; dy++) {
        for (let dx = 0; dx < shape[dy].length; dx++) {
            if (shape[dy][dx]) {
                const x = currentX.value + dx;
                const y = currentY.value + dy;
                if (y >= 0 && y < ROWS && x >= 0 && x < COLUMNS) {
                    dg[y][x] = currentKey.value;
                }
            }
        }
    }
    return dg;
});
// キーボード操作ハンドラ
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
            // ソフトドロップが欲しい場合は useTetris に moveDown を追加して呼び出してください
            break;
        case ' ':
            e.preventDefault();
            drop(); // スペースでハードドロップ
            break;
    }
}
// タッチ操作用
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
function onTouchStart(e) {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    touchStartTime = performance.now();
}
function onTouchEnd(e) {
    if (!isRunning.value)
        return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    const dt = performance.now() - touchStartTime;
    // 横スワイプで左右移動
    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0)
            moveRight();
        else
            moveLeft();
        return;
    }
    // 下スワイプでソフトドロップ（1セル）
    if (Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx)) {
        if (dy > 0)
            drop();
        return;
    }
    // タップ or 長押し
    if (dt < 200) {
        // 短タップで回転
        rotate();
    }
    else {
        // 長押しでハードドロップ
        drop();
    }
}
// ライフサイクルでキー／タッチ操作登録／解除
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
    ...{ onTouchstart: (__VLS_ctx.onTouchStart) },
    ...{ onTouchend: (__VLS_ctx.onTouchEnd) },
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
            onTouchStart: onTouchStart,
            onTouchEnd: onTouchEnd,
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