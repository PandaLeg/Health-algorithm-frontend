<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__row">
        <div class="footer__column">
          <div class="footer__address">
            <p>HA KNURE</p>
            <p>14 Science Avenue</p>
            <p>Kharkiv, KH 61166 - info@domain.com</p>
          </div>
        </div>
        <div class="footer__column">
          <div class="footer__social social">
            <a href="#" aria-label="Twitter" class="social__item _icon-twitter"></a>
            <a href="#" aria-label="Telegram" class="social__item _icon-telegram"></a>
            <a href="#" aria-label="Instagram" class="social__item _icon-instagram"></a>
            <a href="#" aria-label="Facebook" class="social__item _icon-facebook"></a>
          </div>
        </div>
        <div class="footer__column">
          <a href="#" class="footer__dev dev">
            <span class="dev__text">Handcrafted by Vladyslav</span>
            <span class="dev__copy">Copyright ©2023 All rights reserved</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter"
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/icons";
@import "src/assets/scss/footer";
</style>
