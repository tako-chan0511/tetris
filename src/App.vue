<template>
  <div id="app">
    <header class="app-header">
      <h1>Vue3版 Tetris</h1>
    </header>
    <main class="app-main">
      <!-- メインのテトリスボードコンポーネント -->
      <TetrisBoard />
    </main>
  </div>
</template>

<script setup lang="ts">
import TetrisBoard from './components/TetrisBoard.vue';
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #111;
  color: #eee;
  /* min-height: 100vh; */
  margin: 0;
}

.app-header {
  padding: 1rem;
}

.app-header h1 {
  margin: 0;
  font-size: 2rem;
}

.app-main {
  flex: 1;
  display: flex;
  align-items: flex-start; 
  justify-content: center;
  width: 100%;
}
</style>
