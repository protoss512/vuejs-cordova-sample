<template>
    <div style="height: 100vh;" :class="isDark ? 'darkBack' : 'lightBack'">
        <div style="display:flex;padding: 10px;">

            <div style="flex:1;display:flex;flex-direction:column;overflow-y: auto;padding-right: 10px;padding-left: 1px;">

                <div style="width: 100%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);padding-bottom: 10px;"
                    :class="isDark ? 'dark' : 'light'">
                    <div style="margin: 10px;" :class="isDark ? 'darkGray' : 'lightGray'">{{ $t("use_time") }}</div>
                    <div style="margin: 10px;font-size: 18px;">{{ (use_time / 60).toFixed(2) }} HR</div>
                </div>

                <div style="width: 100%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);padding-bottom: 10px;"
                    :class="isDark ? 'dark' : 'light'">
                    <div style="margin: 10px;" :class="isDark ? 'darkGray' : 'lightGray'">{{ $t("sctor_space") }} - {{
                        $t("anwser_num") }}</div>
                    <div style="margin: 10px;font-size: 20px;">{{ total6 }}</div>
                    <div style="margin: 10px;" :class="isDark ? 'darkGray' : 'lightGray'">{{
                        $t("currect_rate") }}</div>
                    <div style="display: flex;">
                        <div style="flex:1"></div>
                        <div style="flex:1"><v-progress-circular style="margin: 0 10px 10px 10px;font-size: 18px;"
                                :color="color" :rotate="rotate" v-model="value6" :size="100" :width="12">{{ value6
                                }}%</v-progress-circular> </div>
                        <div style="flex:1"></div>
                    </div>
                </div>
            </div>

            <div style="flex:1;display:flex;flex-direction:column;overflow-y: auto;padding-right: 2px;padding-left: 1px;">
                <div style="width: 100%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);padding-bottom: 10px;"
                    :class="isDark ? 'dark' : 'light'">
                    <div style="margin: 10px;" :class="isDark ? 'darkGray' : 'lightGray'">{{ $t("to_Ke_Leak") }} - {{
                        $t("anwser_num") }}</div>
                    <div style="margin: 10px;font-size: 20px;">{{ total5 }}</div>
                    <div style="margin: 10px;" :class="isDark ? 'darkGray' : 'lightGray'">{{
                        $t("currect_rate") }}</div>
                    <div style="display: flex;">
                        <div style="flex:1"></div>
                        <div style="flex:1"><v-progress-circular style="margin: 0 10px 10px 10px;font-size: 18px;"
                                :color="color" :rotate="rotate" v-model="value5" :size="100" :width="12">{{ value5
                                }}%</v-progress-circular> </div>
                        <div style="flex:1"></div>
                    </div>
                </div>
                <div style="width: 100%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);padding-bottom: 10px;"
                    :class="isDark ? 'dark' : 'light'">
                    <div style="margin: 10px;" :class="isDark ? 'darkGray' : 'lightGray'">{{ $t("to_read") }} - {{
                        $t("anwser_num") }}</div>
                    <div style="margin: 10px;font-size: 20px;">{{ total7 }}</div>
                    <div style="margin: 10px;" :class="isDark ? 'darkGray' : 'lightGray'">{{
                        $t("currect_rate") }}</div>
                    <div style="display: flex;">
                        <div style="flex:1"></div>
                        <div style="flex:1"><v-progress-circular style="margin: 0 10px 10px 10px;font-size: 18px;"
                                :color="color" :rotate="rotate" v-model="value7" :size="100" :width="12">{{ value7
                                }}%</v-progress-circular> </div>
                        <div style="flex:1"></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import i18n from '../i18n';
export default {
    name: 'Statistics',
    components: {},
    data: function () {
        return {
            total5: localStorage.getItem('Total_num5'),
            total6: localStorage.getItem('Total_num6'),
            total7: localStorage.getItem('Total_num7'),
            rotate: 270,
            use_time: localStorage.getItem('Use_time'),
            color: localStorage.getItem('Dark_mode') == '1' ? '#1D1' : '#191',
            isDark: localStorage.getItem('Dark_mode') == '1' ? true : false,
            backColor: localStorage.getItem('Dark_mode') == '1' ? '#333' : '#33A',
        }
    },
    computed: {
        value5() {
            if (localStorage.getItem('Correct_num5') == 0 && localStorage.getItem('Total_num5') == 0) return 0
            let v = localStorage.getItem('Correct_num5') / localStorage.getItem('Total_num5') * 100
            return v.toFixed(0)
        },
        value6() {
            if (localStorage.getItem('Correct_num6') == 0 && localStorage.getItem('Total_num6') == 0) return 0
            let v = localStorage.getItem('Correct_num6') / localStorage.getItem('Total_num6') * 100
            return v.toFixed(0)
        },
        value7() {
            if (localStorage.getItem('Correct_num7') == 0 && localStorage.getItem('Total_num7') == 0) return 0
            let v = localStorage.getItem('Correct_num7') / localStorage.getItem('Total_num7') * 100
            return v.toFixed(0)
        }
    },
    beforeDestroy() {
        this.$emit('title', 'exit');
    },
    mounted() {
        this.$emit('title', i18n.t("statistics") + ' ');
        setTimeout(() => {
            this.$emit('title', i18n.t("statistics"));
        }, 100)
    },
    methods: {
        to_Highschool_ke_leak() {
            window.location.hash = '/Highschool_ke_leak';
        },
        to_vocabulary() {
            window.location.hash = '/Vocabulary';
        },
        to_read() {
            window.location.hash = '/ReadTest';
        },
        to_setting() {
            window.location.hash = '/Setting';
        },
        to_SctorSpace() {
            window.location.hash = '/SctorSpace';
        }
    }
}
</script>
  
<style scoped>
.darkGray {
    color: #999;
}

.lightGray {
    color: #777;
}

.darkBack {
    background-color: #222;
}

.dark {
    background-color: #333;
    color: #CCC;
}

.darkNoBack {
    color: #CCC;
}

.darkBorder {
    border: 1px groove #444;
}

.lightBorder {
    border: 1px groove #DDD;
}

.light {
    background-color: #EEE;
    color: #222;
}

.lightNoBack {
    color: #222;
}

.lightBack {
    background-color: #DDD;
}

.demo-card-square.mdl-card {
    height: 320px;
}

.demo-card-square>.img1 {
    background:
        url('../assets/toeic.jpg') bottom right 15% no-repeat;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.demo-card-square>.img2 {
    background:
        url('../assets/toeic2.jpg') bottom right 15% no-repeat;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.demo-card-square>.img3 {
    background:
        url('../assets/toeic3.jpg') bottom right 15% no-repeat;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}
</style>
  