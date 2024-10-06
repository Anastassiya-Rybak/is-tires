<template>
    <figure class="second-block__card_base" @click="goForCategory">
        <img :src="`/images/${category}.webp`" :alt="categoryName">
        <figcaption>{{ categoryName }}</figcaption>
    </figure>
</template>

<script setup>
    const router = useRouter();
    const props = defineProps({
        categoryName: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    })

    const goForCategory = () => {
        router.push({
            path: '/catalog',
            query: {
                type: 'filter',
                sort: `0 ${props.index + 1} 0 0 0`
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

        @include hover {
            filter: brightness(1.2);

            &:hover>figcaption {
                top: 0;
                backdrop-filter: blur(4px);
                animation: changePosition 0.4s ease-in-out alternate;
                text-align: center;
                padding: 2em 0;
                height: 100%;
                color: white;
                letter-spacing: 0.2em;

                @keyframes changePosition {
                    from { top: 5%; }
                    to { top: 0; }
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
            color: white;
            text-shadow: 0 0 0.4em black;
            font-weight: 500;
            background-color: #00a85785;
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