<template>
    <div ref="autoRotate" class="bg" :style="{transform: 'rotateX(' + rotateX + 'deg)' + ' rotateY(' + rotateY + 'deg)', backgroundImage: 'url(' + src + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}"></div>
</template>

<script>
    import Two from 'two.js'
    export default {
        name: "AutoRotate",
        description: '单图片自动摇晃',
        props: {
            src: {
                type: String,
                required: true,
            },
            rangeX: {
                type: Number,
                default: function () {
                    return 15
                }
            },
            rangeY: {
                type: Number,
                default: function () {
                    return 0
                }
            },
            rate: {
                type: Number,
                default: function () {
                    return 0.1
                }
            },
        },
        data(){
            return {
                rotateX: 0,
                rotateY: 0
            }
        },
        mounted(){
            let dom = this.$refs.autoRotate
            let width = dom.offsetWidth
            let height = dom.offsetHeight
            let two = new Two({
                fullscreen: false,
                autostart: true,
                type: Two.Types.svg,
                width,
                height
            }).appendTo(dom);
            let addX = true
            let addY = true
            two.bind('update', () => {
                if(this.rotateX >= this.rangeX * 2) {
                    addX = false
                }
                if(this.rotateX <= -this.rangeX){
                    addX = true
                }
                if(addX){
                    this.rotateX += this.rate
                }else{
                    this.rotateX -= this.rate
                }

                if(this.rotateY >= this.rangeY * 2) {
                    addY = false
                }
                if(this.rotateY <= - this.rangeY){
                    addY = true
                }
                if(addY){
                    this.rotateY += this.rate
                }else{
                    this.rotateY -= this.rate
                }
            });
        }
    }
</script>

<style scoped module>
</style>
