<template>
  <transition name="fade">
    <div
      v-show="value === true"
      class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50"
      :class="[computedClass]"
    >
      <div class="flex items-center justify-center space-x-2 animate-bounce">
        <div class="w-4 h-4 rounded-full" style="background-color: rgba(50,50,50,0.8);"></div>
        <div class="w-4 h-4 rounded-full delay-300" style="background-color: rgba(50,50,50,0.5);"></div>
        <div class="w-4 h-4 rounded-full delay-700" style="background-color: rgba(50,50,50,0.2);"></div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLoading } from '@/store/loading'

const loading = useLoading()

const value = computed(() => loading.value)
const computedClass = computed(() => [loading.transparent ? 'bg-transparent' : 'bg-transparent'])
</script>

<style scoped lang="scss">

</style>
