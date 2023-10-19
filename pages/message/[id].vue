<template>
    <div>
        this is user[id] page
        user id : {{ userId }}
    </div>
    <!-- <User></User> -->
    
    <Message></Message>

</template>

<script setup>
    const route = useRoute()
    const userId = route.params.id
</script>
