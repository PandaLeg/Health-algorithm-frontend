<template>
    <div class="doctor">
        <div class="container">
            <div class="doctor__body">
                <div class="doctor__block">
                    <div class="doctor__list doctor-list">
                        <div class="doctor-list__card doctor-card">
                            <div class="doctor-card__wrapper">
                                <div class="doctor-card__block">
                                    <div class="doctor-card__content">
                                        <div class="doctor-card__avatar">
                                            <img :src="images.verifiedEmail" alt="Not found">
                                        </div>
                                        <div class="doctor-card__inner">
                                            <div class="doctor-card__main">
                                                <div class="doctor-card__full-name">
                                                    <span>Царук Евгений Григорьевич</span>
                                                </div>
                                                <div class="doctor-card__specialties specialties">
                                                    <div class="specialties__list">
                                                        <span class="specialties__item">Психиатр-нарколог</span>
                                                        <span class="specialties__item">Психиатр</span>
                                                        <span class="specialties__item">Нарколог</span>
                                                        <span class="specialties__item">Психотерапевт</span>
                                                        <span class="specialties__item">Психолог</span>
                                                    </div>
                                                </div>
                                                <div class="doctor-card__category">
                                                    <span>Врач высшей категории</span>
                                                </div>
                                            </div>
                                            <div class="doctor-card__experience experience">
                                                <span class="experience__number">12</span>
                                                <span class="experience__text">лет опыта</span>
                                            </div>
                                            <div class="doctor-card__description">
                                                Занимается эффективным лечением нарушения трудоспособности, депрессивных
                                                состояний, синдрома хронической усталости, страхов, тревоги, апатии и
                                                вялости, нарушения сна, шизофрении, психических расстройств у лиц
                                                пожилого и старческого возраста. Лечебно-профилактическая работа среди
                                                пациентов психиатрического, наркологического профилей. первичный осмотр
                                                пациента, установление предварительного диагноза, назначение лечения с
                                                последующим подбором поддерживающего лечения. Также ведет приём на
                                                английском языке.
                                            </div>
                                            <div class="doctor-card__price">
                                                <span>1600 грн</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="doctor-card__clinics">

                                    </div>
                                </div>
                                <div class="doctor-card__block">
                                    <div class="doctor-card__slots doctor-slots">
                                        <div class="doctor-slots__title">
                                            <span>Предварительная запись</span>
                                        </div>
                                        <div class="doctor-slots__select-time">
                                            Выберите желаемое время и ожидайте подтверждения
                                        </div>
                                        <div class="doctor-slots__days slots-days">
                                            <div class="slots-days__item">
                                                <span class="slots-days__week-day">Сб</span>
                                                <span class="slots-days__date">06 Май</span>
                                            </div>
                                            <div class="slots-days__item">
                                                <span class="slots-days__week-day">Вс</span>
                                                <span class="slots-days__date">07 Май</span>
                                            </div>
                                            <div class="slots-days__item">
                                                <span class="slots-days__week-day">Пн</span>
                                                <span class="slots-days__date">08 Май</span>
                                            </div>
                                        </div>
                                        <ul class="doctor-slots__list visit-time">
                                            <li class="visit-time__item">
                                                <span>17:30</span>
                                            </li>
                                            <li class="visit-time__item">
                                                <span>17:30</span>
                                            </li>
                                            <li class="visit-time__item">
                                                <span>17:30</span>
                                            </li>
                                            <li class="visit-time__item">
                                                <span>17:30</span>
                                            </li>
                                            <li class="visit-time__item">
                                                <span>17:30</span>
                                            </li>
                                            <li class="visit-time__item">
                                                <span>17:30</span>
                                            </li>
                                            <li class="visit-time__item">
                                                <span>17:30</span>
                                            </li>
                                            <li class="visit-time__item">
                                                <span>17:30</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="doctor__block">
                    <VPagination
                            :value="1"
                            :total-pages="5"
                            @next-page="() => {console.log('KEK')}"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VPagination from "../../components/custom/VPagination.vue";

export default {
    name: "DoctorPage",
    components: {
        VPagination
    },
    setup() {

    },
    computed: {
        images() {
            return {
                verifiedEmail: require('../../assets/images/verified-email.webp')
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.doctor {
  height: 100%;

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__block {
    &:first-child {
      flex: 1 1 auto;
    }
  }
}

.doctor-list {
  &__card {
    &:first-child {
      margin-top: 38px;
    }

    margin-bottom: 20px;
  }
}

.doctor-card {
  box-shadow: 2px 2px 15px rgb(128 142 184 / 10%);
  border-radius: 8px;
  background: #fff;

  &__wrapper {
    display: flex;

    @media screen and (max-width: $md2 + px) {
      flex-direction: column;
    }
  }

  &__block {
    flex: 1;
    padding-top: 20px;
    position: relative;

    &:first-child {
      flex: 0 1 70%;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: #ebeff6;
      }

      @media screen and (max-width: $md2 + px) {
        flex: 1;

        &::after {
          display: none;
        }
      }
    }
  }

  &__content {
    display: flex;
    margin-bottom: 15px;

    @media screen and (max-width: $md4 + px) {
      flex-direction: column;
      padding: 0 15px;
    }
  }

  &__avatar {
    flex: 1 0 135px;
    max-width: 135px;
    margin: 0 10px;
    border-radius: 8px;

    img {
      max-width: 100%;
      height: auto;
      max-height: 100%;
      border-radius: 8px;
    }

    @media screen and (max-width: $md4 + px) {
      align-self: center;
    }
  }

  &__inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
  }

  &__main {
    margin-bottom: 5px;

    @media screen and (max-width: $md4 + px) {
      text-align: center;
    }
  }

  &__full-name {
    margin-bottom: 5px;
    line-height: 24px;
    font-weight: 700;
    font-size: 24px;

    @media screen and (max-width: $md2 + px) {
      font-size: 18px;
    }
  }

  &__specialties, &__category {
    font-weight: 700;

    @media screen and (max-width: $md2 + px) {
      font-size: 13px;
    }
  }

  &__specialties {
    margin-bottom: 5px;
  }

  &__category {
    margin-bottom: 10px;
  }

  &__description {
    margin: 10px 0;
    line-height: 16px;
    color: #707272;
    font-size: 13px;
  }

  &__price {
    margin-bottom: 15px;
    align-self: end;
  }
}

.specialties {
  &__item {
    &::before {
      content: ' ';
    }

    &::after {
      content: ',';
    }

    &:last-child::after {
      content: '';
    }
  }
}

.experience {
  display: inline-flex;
  align-items: center;
  color: #707272;
  font-size: 13px;

  &__number {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    background-color: #0957c3;
    border-radius: 10px;
    color: #fff;
    width: 20px;
    height: 20px;
    font-size: 11px;
    font-weight: 700;
  }

  @media screen and (max-width: $md4 + px) {
    justify-content: center;
  }
}

.doctor-slots {
  display: flex;
  flex-direction: column;
  padding: 0 19px 20px;

  &__title {
    font-weight: 700;
    text-align: center;
    font-size: 13px;
  }

  &__select-time {
    margin: 20px 0 15px;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
  }

  &__days {
  }

  &__list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: $md2 + px) {
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0 0 10px;
    }
  }
}

.slots-days {
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ebeff6;
  border-radius: 8px;

  &__item {
    flex: 1 0 33.333%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    cursor: pointer;
    text-align: center;
    position: relative;

    &:not(&:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      width: 1px;
      height: 20px;
      background-color: #ebeff6;
    }
  }

  &__week-day {
    margin-right: 3px;
    font-weight: 700;
  }

  &__day {
  }
}

.visit-time {
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1 0 70px;
    height: 32px;
    max-width: 70px;
    margin: 4px;
    padding: 0 10px;
    background-color: #ebf6f3;
    color: #0fb4a8;
    font-weight: 500;
    font-size: 13px;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #1fbeb2;
      color: #fff;
    }
  }
}
</style>
