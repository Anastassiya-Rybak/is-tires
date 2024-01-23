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

<style lang="scss">
    .page-enter-active,
    .page-leave-active {
        transition: all 0.4s;
    }
    .page-enter-from,
    .page-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }
</style>