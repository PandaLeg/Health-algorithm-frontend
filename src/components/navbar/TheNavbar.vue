<template>
    <header class="header">
        <div class="header__content">
            <div class="header__logo logo">
                <router-link :to="{name: routesNames.home.name}" class="logo__title">
                    Health Algorithm
                </router-link>
            </div>
            <nav class="header__menu menu">
                <div
                    class="menu__icon icon-menu"
                    :class="active"
                    @click="changeStateBurger"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div
                    class="menu__body"
                    :class="active"
                    @click="changeStateBurger"
                >
                    <ul class="menu__list">
                        <li>
                            <router-link
                                :to="{name: routesNames.home.name}"
                                class="menu__link"
                                @click="changeStateBurger"
                            >
                                Main
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{name: routesNames.home.name}"
                                class="menu__link"
                                @click="changeStateBurger"
                            >
                                Doctors
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{name: routesNames.home.name}"
                                class="menu__link"
                                @click="changeStateBurger"
                            >
                                Clinics
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{name: routesNames.home.name}"
                                class="menu__link"
                                @click="changeStateBurger"
                            >
                                Log in
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
import routesNames from "../../router/routesNames";

export default {
    name: "TheNavbar",
    data() {
        return {
            isActive: false,
        }
    },
    computed: {
        routesNames() {
            return routesNames
        },
        active() {
            return {
                active: this.isActive,
            }
        }
    },
    methods: {
        changeStateBurger() {
            this.isActive = !this.isActive

            const body = document.body
            body.classList.toggle('lock')
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";
@import "src/assets/scss/header.scss";
</style>
