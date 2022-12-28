<template>
    <b-tabs type="is-boxed">
        <b-tab-item>
            <template #header>
                <b-icon
                pack="fas"
                icon="image"
                size="is-medium"
                style="display: inline-block"                
              ></b-icon>
                <span> 廣告設定 </span>
              
            </template>
            <AdSettingModal></AdSettingModal>
        </b-tab-item>
        <b-tab-item>
            <template #header>
                <b-icon
                pack="fas"
                icon="video"
                size="is-medium"
                style="display: inline-block"                
              ></b-icon>
                <span> 影片設定 </span>
            </template>
            <VideoSettingModal></VideoSettingModal>
        </b-tab-item>
    </b-tabs>
</template>

<script>
 import AdSettingModal from "./AdSetting-View.vue";
 import VideoSettingModal from "./VideoSetting-View.vue";
export default {
    components: {
        AdSettingModal,
        VideoSettingModal
    },
    data() {
        return {
           
        }
    },
    mounted() {
       
    }
}
</script>
