<template>
    <NuxtLink :to="to" class="inline-block">
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
    const props = defineProps([
        'to'
])
</script>