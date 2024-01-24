<template>
    <button class="btn">{{ text }}</button>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true,
            default: ""
        }
    })
</script>

<style lang="scss">
    .btn {
        padding: 0.8em 1.6em;
        border-radius: 10px;
        cursor: pointer;
        color: $main-light;
        border: 1px solid rgba(0, 0, 0, 0.089);
        text-shadow: 0px 0.3em 0.3em rgba(0, 0, 0, 0.25);
        background-color: $accent;
        transition: 0.3s;
        box-shadow: 0px 0.3em 0.3em 0px rgba(255, 255, 255, 0.68) inset, 0px 0.1em 0.15em 0.02em rgba(0, 0, 0, 0.25);

        @include hover() {
                filter: brightness(90%);
        }

        &:active {
            transform: scale(0.98, 0.98);
        }
    }
</style>