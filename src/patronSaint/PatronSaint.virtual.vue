<template>
  <div class="patron-saint">
    <div class="nav">简陋的自定义的导航栏</div>
    <$KEBAB_PAGE_NAME$ />
  </div>
</template>

<script>
import $PAGE_NAME$ from './$PAGE_NAME$.vue'

export default {
  components: {
    $PAGE_NAME$
  }
}
</script>
<style>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4em;
  color: white;
  background-color: gray;
}
</style>
