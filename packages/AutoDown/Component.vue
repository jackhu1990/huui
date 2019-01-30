<template>
    <div ref="autoDown" :style="{transform: 'rotateX(' + rotateX + 'deg)'}"></div>
</template>

<script>
    import Two from 'two.js'
    export default {
        name: "AutoDown",
        description: '多图片自动滑落',
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
                    return 0
                }
            }
        },
        data(){
            return {
            }
        },
        mounted(){
            // 使用样式传递的宽高, 禁用属性 width, height, 使行为统一
            let dom = this.$refs.autoDown
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
                let itemWidth = width * (item.size ? item.size : 1)
                let itemHeight = height * (item.size ? item.size : 1)
                let texture= new Two.Texture(item.src, () =>{
                    // 资源加上自适应的宽高, 配合似 svg viewbox 特性, 内部内容自动响应大小
                    if (item.size) texture.image.width = itemWidth
                    if (item.size) texture.image.height = itemHeight
                    let rawX = item.right ? (item.xScale ? item.xScale * width : width) : 0
                    let rawY = 0
                    let rect = two.makeRectangle(rawX, rawY, texture.image.width ,texture.image.height);
                    rect.fill = texture
                    rect.noStroke()

                    two.bind('update', function() {
                        if(rect.translation.x < 0){
                            rect.translation.x = width
                        }
                        if(rect.translation.y < 0){
                            rect.opacity = 1
                            rect.translation.y = height
                        }

                        let x = (rect.translation.x + item.downX) % width
                        let y = (rect.translation.y + item.downY) % height

                        rect.translation.set(x,y)
                        if(rect.opacity > 0){
                            // if(item.name === 'start'){
                            //     console.log(1-y % width /width)
                            // }
                            rect.opacity = (1-y % width /width)
                        }
                    });
                })
            })
        }
    }
</script>

<style scoped module>
</style>
