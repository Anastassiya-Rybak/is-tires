<template>
    <newsletter-form 
        class="mail-form"
        headerText=""
        inputPlaceholder="ВВЕДИТЕ СВОЙ EMAIL"
        buttonText="ПОДПИСАТЬСЯ"
    />    
</template>

<script setup>
</script>


<style lang="scss">
    /* MAILING */

    @media (max-width: 1130px) {
        .mail-form {
            flex-direction: column;
            gap: 15px;
        }

        .mail-form input,
        .mail-form button {
            width: 90%;
        }
    }

    @media (max-width: 845px) {
        .mail-form input,
        .mail-form button {
            font-size: 14px;
            padding: 0.8em;
        }
    }

    @media (max-width: 445px) {
        .mail-form input,
        .mail-form button {
            font-size: 12px;
            padding: 0.8em;
        }
    }

    @media (max-width: 400px) {
        .mail-form,
        .mail-form button {
            width: 95%;
            font-size: 10px;
        }
    }

</style>