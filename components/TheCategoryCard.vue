<template>
    <figure class="second-block__card_base" @click="goForCategory">
        <img :src="`/images/${categoryName}.webp`" :alt="categoryName">
        <figcaption>{{ categoryName }}</figcaption>
    </figure>
</template>

<script setup>
    import { useFilterStore } from '~/stores/filter';

    const filterStore = useFilterStore();

    const props = defineProps({
        categoryName: {
            type: String,
            required: true
        }
    })

    const editFilter = () => {
        filterStore.editItem("selectedType", props.categoryName);
    }

    const goForCategory = async () => {
        editFilter();
        await navigateTo({
            path: '/catalog',
            query: {
                type: 'filter',
                sort: `null+${props.categoryName}+null+null`
            }
        });
    }
</script>

<style lang="scss" scoped>
    .second-block__card_base {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        border-radius: 10px;
        cursor: pointer;

        @media (hover: hover) {
            &:hover {
                border-radius: 50%;
                filter: brightness(1.2);
            }
        }

        @media (hover: none) {
            &:active {
                border-radius: 50%;
                filter: brightness(1.2);
            }
        }

        @media (hover: hover) {
            &:hover>figcaption {
                top: 40%;
                animation: changePosition 0.4s ease-in-out alternate;
                text-align: center;
                padding: 2em 0;
                height: fit-content;

                @keyframes changePosition {
                    from { top: 5%; }
                    to { top: 40%; }
                }
            }
        }

        @media (hover: none) {
            &:active>figcaption {
                top: 40%;
                animation: changePosition 0.4s ease-in-out alternate;
                text-align: center;
                padding: 2em 0;
                height: fit-content;

                @keyframes changePosition {
                    from { top: 5%; }
                    to { top: 40%; }
                }
            }
        }

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }

        figcaption {
            position: absolute;
            top: 5%;
            left: 0;
            width: 100%;
            height: 13%;
            font-size: 1vw;
            font-weight: 800;
            background-color: #00a857c4;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

            @include media(830px) {
                top: 10%;
            }

            @include media(680px) {
                height: 20%;
                font-size: 1.5vw;
            }

            @include media(500px) {
                height: 32%;
                font-size: 2.3vw;
            }
        }
    }
</style>