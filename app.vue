<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
    const { t } = useI18n();
    useSeoMeta({
        title: () => t('home_title'),
        ogTitle: () => t('home_title'),
        description: () => t('home_title'),
        ogDescription: () => t('home_title'),
        ogImage: () => '',
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