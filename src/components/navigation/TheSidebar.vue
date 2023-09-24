<template>
  <nav
      class="sidebar"
      :class="{'close': isOpen}"
  >
    <header class="sidebar__header header-sidebar">
      <div class="header-sidebar__image-text">
              <span class="header-sidebar__image">
                  <img :src="images.verifiedEmail" alt="Not Found">
              </span>

        <div class="sidebar__text header-sidebar__text">
          <span class="header-sidebar__title">Admin</span>
        </div>
      </div>

      <i
          class="sidebar__toggle _icon-chevron-right-solid"
          @click="isOpen = !isOpen"
      >
      </i>
    </header>

    <div class="sidebar__menu menu-sidebar">
      <div class="menu-sidebar__body">
        <div class="menu-sidebar__search-box">
          <i class="menu-sidebar__icon _icon-search"></i>
          <input type="search" placeholder="Search...">
        </div>

        <ul class="menu-sidebar__links">
          <li>
            <router-link
                to=""
                class="menu-sidebar__link"
            >
              <i class="menu-sidebar__icon _icon-home"></i>
              <span class="sidebar__text menu-sidebar__text">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link
                to=""
                class="menu-sidebar__link"
            >
              <i class="menu-sidebar__icon _icon-clinic"></i>
              <span class="sidebar__text menu-sidebar__text">Clinics</span>
            </router-link>
          </li>
          <li>
            <router-link
                to=""
                class="menu-sidebar__link"
            >
              <i class="menu-sidebar__icon _icon-doctor"></i>
              <span class="sidebar__text menu-sidebar__text">Doctors</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="menu-sidebar__bottom-content">
        <router-link
            to=""
            class="menu-sidebar__link"
            @click="logoutUser"
        >
          <i class="menu-sidebar__icon _icon-logout"></i>
          <span class="sidebar__text menu-sidebar__text">Logout</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>

import routesNames from "../../router/routes-names";
import logout from "../../hooks/auth/logout.hook";
import {ref} from "vue";

export default {
  name: "TheSidebar",
  setup() {
    const isOpen = ref(false)
    const {logoutUser} = logout()

    return {
      isOpen,
      logoutUser
    }
  },
  computed: {
    routesNames() {
      return routesNames
    },
    images() {
      return {
        verifiedEmail: require('../../assets/images/verified-email.webp')
      }
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/icons";

.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: $widthOpenSidebar + px;
  padding: 10px 14px;
  background: $white;
  z-index: 100;
  transition: $transition04;

  &__text {
    font-size: 16px;
    font-weight: 500;
    transition: $transition03;
    white-space: nowrap;
    opacity: 1;
  }

  &__toggle {
    position: absolute;
    top: 50%;
    right: -25px;
    transform: translateY(-50%) rotate(180deg);
    height: 25px;
    width: 25px;
    background: $darkTeal;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: $transition03;
    cursor: pointer;

    &::before {
      color: $white;
      font-size: 12px;
    }
  }

  &__menu {
    height: 100%;
  }

  &.close {
    width: $widthCloseSidebar + px;

    .sidebar__text {
      opacity: 0;
    }

    .menu__search-box {
      input {
        background: $white;
      }
    }

    .sidebar__toggle {
      transform: translateY(-50%);
    }

    & ~ .admin-page {
      padding: 0 0 0 $widthCloseSidebar + px;
    }
  }
}

.header-sidebar {
  position: relative;

  &__image-text {
    display: flex;
    align-items: center;
  }

  &__image {
    img {
      width: 60px;
      border-radius: 6px;
    }
  }

  &__text {
    flex: 1 1 auto;
    padding: 0 5px;
    word-break: break-all;
  }

  &__title {
    font-weight: 700;
  }
}

.menu-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__links {

    li {
      height: 50px;
      margin-top: 10px;
      display: flex;
      align-items: center;
    }
  }

  &__link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 6px;
    transition: $transition03;

    &:hover {
      background: $darkTeal2;

      .menu-sidebar__icon,
      .menu-sidebar__text {
        color: $white;
      }
    }
  }

  &__search-box {
    display: flex;
    align-items: center;
    height: 50px;
    background: $LightenTeal2;
    margin: 20px 0;
    border-radius: 6px;

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding: 5px;
      background: $LightenTeal2;
      transition: $transition03;
      opacity: 1;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    ::placeholder {
      font-size: 15px;
    }
  }

  &__icon {
    text-align: center;
    min-width: 60px;
    font-size: 20px;
  }

  &__text, &__icon {
    color: $grayDarken2;
    transition: $transition02;
  }

  &__bottom-content {
    display: flex;
    align-items: center;
    height: 50px;
    margin-top: 10px;
  }
}
</style>
