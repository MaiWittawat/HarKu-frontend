<template>
    <NuxtLink :to="to" class="inline-block px-4 py-2 ">
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
    const props = defineProps([
        'to'
])
</script>