<template lang="pug">

div
    animation-list

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import AnimationList from "@/shared/ui/AnimationList/AnimationList.vue"

@Component({
    components: { AnimationList }
})
export default class AnimationView extends Vue {}
</script>
