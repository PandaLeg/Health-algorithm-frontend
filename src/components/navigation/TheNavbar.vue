<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo logo">
        <router-link :to="{name: routes.home.name}" class="logo__title">
          Health Algorithm
        </router-link>
      </div>
      <nav class="header__menu menu">
        <div
            class="menu__icon icon-menu"
            :class="activeClass"
            @click="changeStateBurger"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
            class="menu__body"
            :class="activeClass"
            @click="changeStateBurger"
        >
          <ul class="menu__list">
            <li>
              <router-link
                  :to="{name: routes.home.name}"
                  class="menu__link"
                  @click="changeStateBurger"
              >
                Main
              </router-link>
            </li>
            <li>
              <router-link
                  :to="{name: routes.doctor.name}"
                  class="menu__link"
                  @click="changeStateBurger"
              >
                Doctors
              </router-link>
            </li>
            <li>
              <router-link
                  :to="{name: routes.clinics.name}"
                  class="menu__link"
                  @click="changeStateBurger"
              >
                Clinics
              </router-link>
            </li>
            <li v-if="!isLoggedIn">
              <router-link
                  :to="{name: routes.login.name}"
                  class="menu__link"
                  @click="changeStateBurger"
              >
                Log in
              </router-link>
            </li>
            <li v-if="!isLoggedIn">
              <router-link
                  :to="{name: routes.registration.name}"
                  class="menu__link"
                  @click="changeStateBurger"
              >
                Registration
              </router-link>
            </li>
            <li v-if="isLoggedIn">
              <a
                  class="menu__link"
                  @click="logoutUser"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import routesNames from "../../router/routesNames";
import {computed} from "vue";
import logout from "../../hooks/auth/logout.hook";
import active from "../../hooks/navbar/active.hook";

export default {
  name: "TheNavbar",
  setup() {
    const {isActive, activeClass, changeStateBurger, isLoggedIn} = active()
    const routes = computed(() => routesNames)

    const {logoutUser} = logout(isActive, changeStateBurger)

    return {
      routes,
      activeClass,
      isLoggedIn,
      changeStateBurger,
      logoutUser
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/header";
</style>
