<template>
    <div ref="autoRotation" :style="{transform: 'rotateX(' + rotateX + 'deg)'}"></div>
</template>

<script>
    import Two from 'two.js'
    export default {
        name: "AutoRotation",
        description: '多图片自动旋转',
        props: {
            items: {
                type: Array,
                required: true,
                default: function () {
                    return []
                }
            },
            rotateX: {
                type: Number,
                required: false,
                default: function () {
                    return 60
                }
            }
        },
        data(){
            return {
            }
        },
        mounted(){
            // 使用样式传递的宽高, 禁用属性 width, height, 使行为统一
            let dom = this.$refs.autoRotation
            let width = dom.offsetWidth
            let height = dom.offsetHeight
            let two = new Two({
                fullscreen: false,
                autostart: true,
                type: Two.Types.svg,
                width,
                height
            }).appendTo(dom);
            this.items.map(item =>{
                let itemWidth = width * item.size
                let itemHeight = height * item.size
                let texture= new Two.Texture(item.src, () =>{
                    // 资源加上自适应的宽高, 配合似 svg viewbox 特性, 内部内容自动响应大小
                    texture.image.width = itemWidth
                    texture.image.height = itemHeight
                    let rect = two.makeRectangle(two.width / 2, two.height / 2, texture.image.width ,texture.image.height);
                    rect.fill = texture
                    rect.noStroke()

                    two.bind('update', function() {
                        rect.rotation += item.rotation
                    });
                })
            })
        }
    }
</script>

<style scoped module>
</style>
