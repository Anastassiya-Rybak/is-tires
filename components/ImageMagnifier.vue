<template>
    <div class="magnifier-container" @mousemove="magnify" @mouseleave="hide">
      <img :src="imageSrc" :alt="alt" class="product-image" />
      <div class="magnifier" v-if="show" :style="magnifierStyle"></div>
    </div>
</template>

<script>
    export default {
        props: {
            imageSrc: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                required: true
            },
            zoom: {
                type: Number,
                default: 2
            }
        },
        data() {
            return {
                show: false,
                magnifierStyle: {}
            };
        },
        methods: {
            magnify(event) {
                const container = this.$el;
                const { left, top, width, height } = container.getBoundingClientRect();
                const x = event.clientX - left * 0.8;
                const y = event.clientY - top * 0.8;

                this.magnifierStyle = {
                    backgroundImage: `url(${this.imageSrc})`,
                    backgroundSize: `${width * this.zoom}px ${height * this.zoom}px`,
                    backgroundPosition: `${-x * this.zoom + width / 2}px ${-y * this.zoom + height / 2}px`,
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${width / this.zoom}px`,
                    height: `${height / this.zoom}px`,
                };

                this.show = true;
            },
            hide() {
                this.show = false;
            }
        }
    };
</script>

<style scoped>
    .magnifier-container {
        position: relative;
        display: inline-block;
    }

    .product-image {
        max-width: 100%;
    }

    .magnifier {
        position: absolute;
        border: 1px solid #000;
        pointer-events: none;
        cursor: none;
        overflow: hidden;
        transition: opacity 0.2s;
    }
</style>
