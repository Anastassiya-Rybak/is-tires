<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
    useHead({
        title: 'Искра Сервис',
        htmlAttrs: {
            lang: 'ru'
        },
        meta: [
            { name: 'description', content: 'Высококачественные шины для крупногабаритной техники.' }
        ],
        bodyAttrs: {
            class: 'test'
        },
    }),
    useSeoMeta({
        title: 'Искра Сервис',
        ogTitle: 'Искра Сервис',
        description: 'Высококачественные шины для крупногабаритной техники..',
        ogDescription: 'Высококачественные шины для крупногабаритной техники.',
        ogImage: '',
    })
</script>

<style lang="scss" scoped>

</style>