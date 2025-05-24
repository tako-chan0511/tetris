import { computed } from 'vue';
import { COLORS } from '@/types/shapes';
const props = defineProps();
// セルのサイズ（px）
const CELL_SIZE = 24;
// 色を計算。null なら暗めの背景、キーなら COLORS から取得
const cellStyle = computed(() => ({
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    backgroundColor: props.color
        ? COLORS[props.color]
        : '#111'
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "cell" },
    ...{ class: ({
            empty: __VLS_ctx.color === null,
            filled: __VLS_ctx.color !== null
        }) },
    ...{ style: (__VLS_ctx.cellStyle) },
});
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['empty']} */ ;
/** @type {__VLS_StyleScopedClasses['filled']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cellStyle: cellStyle,
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
//# sourceMappingURL=TetrisCell.vue.js.map