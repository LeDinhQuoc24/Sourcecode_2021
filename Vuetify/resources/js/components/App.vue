<template>

    <v-app>
        <v-app-bar
            app
            color="primary"
            dark


        >
            <div class="d-flex align-center">

                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="80"
                />
                <h1>Vuetify</h1>

                <v-container fluid>
                    <v-switch
                        class="pl-4 mt-5"
                        :label="checkLang ? 'En' : 'Vi'"
                        v-model="checkLang"
                        @change="changeLang"
                    ></v-switch>

                </v-container>
                <v-img
                    v-if="checkLang"
                    src="img/flag_en.png"
                    alt="flag"
                    class="w-8 h-8 "
                ></v-img>
                <v-img
                    v-if="!checkLang"
                    src="img/flag_vi.png"
                    alt="flag"
                    class="w-8 h-8 "
                ></v-img>

            </div>

            <v-spacer></v-spacer>

            <v-btn
                href="https://www.google.com.vn/"
                target="_blank"
                text
                width="80"
            >
                <span class="mr-2">Google</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>

            <router-view ></router-view>

            <v-footer
                color="primary lighten-1"
                class="footer"
            >
                <v-col
                    class="text-center mt-2 "
                    cols="10"

                >
                    <span style="color: white">  Lampart - Team Intership - 2021</span>

                </v-col>
                <v-img
                    max-height="80"
                    max-width="80"
                    src="img/lampart.png"

                ></v-img>


            </v-footer>
        </v-main>

    </v-app>


</template>


<script>

import i18n from "../../../src/i18n";
export default {
    name: 'App',

    data: () => ({
        checkLang:true,
    }),
    mounted() {
        this.$route.params.lang.includes('en')  ? this.changeToEn2() : this.changeToVi2();
    },
    methods :{
        changeLang(){
            return i18n.locale === 'en' ? this.changeToVi() : this.changeToEn() ;
        },
        changeToEn() {
            i18n.locale='en';
            this.$router.push({
                params:{lang:'en'}
            })
            this.$vuetify.theme.themes.light.primary = '#2196F3'
            this.$vuetify.rtl = false;
            this.checkLang = true;
        },
        changeToVi() {
            i18n.locale='vi';
            this.$router.push({
                params:{lang:'vi'}
            })
            this.$vuetify.theme.themes.light.primary = '#9C27B0'
            this.$vuetify.rtl = true;
            this.checkLang = false;
        },
        changeToEn2() {
            i18n.locale='en';
            this.$vuetify.theme.themes.light.primary = '#2196F3'
            this.$vuetify.rtl = false;
            this.checkLang = true;
        },
        changeToVi2() {
            i18n.locale='vi';
            this.$vuetify.theme.themes.light.primary = '#9C27B0'
            this.$vuetify.rtl = true;
            this.checkLang = false;
        }
    }
};
</script>
<style>
.footer{
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    direction: rtl;
}

</style>

