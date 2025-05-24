import { computed, defineProps } from 'vue';
import { SHAPES } from '@/types/shapes';
const props = defineProps();
// 最初の回転パターンを取得
const matrix = computed(() => {
    const variants = SHAPES[props.shape];
    if (!variants || !variants.length) {
        // 万が一のフォールバック（全て空セル）
        return [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
    }
    return variants[0];
});
// テンプレートで使いやすいように shape を展開
const { shape } = props;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "preview" },
});
for (const [row, y] of __VLS_getVForSourceType((__VLS_ctx.matrix))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (y),
        ...{ class: "preview-row" },
    });
    for (const [cell, x] of __VLS_getVForSourceType((row))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
            key: (x),
            ...{ class: (['preview-cell', cell ? `color-${__VLS_ctx.shape}` : '']) },
        });
    }
}
/** @type {__VLS_StyleScopedClasses['preview']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-row']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-cell']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            matrix: matrix,
            shape: shape,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=NextPiecePreview.vue.js.map