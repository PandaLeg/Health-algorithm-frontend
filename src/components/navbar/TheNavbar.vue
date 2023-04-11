<template>
    <header class="header">
        <div class="header__content">
            <nav class="header__menu menu">
                <div class="menu__icon icon-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="menu__body">
                    <ul class="menu__list">
                        <li><a href="#" class="menu__link">Main</a></li>
                        <li><a href="#" class="menu__link">Doctors</a></li>
                        <li><a href="#" class="menu__link">Clinics</a></li>
                        <li><a href="#" class="menu__link">Log In</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: "TheNavbar"
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";
@import "src/assets/scss/header.scss";
</style>
