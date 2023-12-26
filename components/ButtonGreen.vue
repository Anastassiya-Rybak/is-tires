<template>
    <button class="popup-btn">{{ text }}</button>
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

<style>
    .popup-btn {
        /* width: calc(50% - 5px); */
        padding: 0.8em 1.6em;
        border-radius: 1.09em;
        cursor: pointer;
        color: #ffffff;
        /* font-size: 14px; */
        border: 1px solid rgba(0, 0, 0, 0.089);
        text-shadow: 0px 0.3em 0.3em rgba(0, 0, 0, 0.25);
        background-color: #00BA61;
        transition: 0.3s;
        box-shadow: 0px 0.3em 0.3em 0px rgba(255, 255, 255, 0.68) inset, 0px 0.3em 0.3em 0px rgba(0, 0, 0, 0.25);
    }

    .popup-btn:hover {
        filter: brightness(90%);
    }

    .popup-btn:active {
        transform: scale(0.98, 0.98);
    }
</style>