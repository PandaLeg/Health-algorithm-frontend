<template>
    <div class="doctor-card__wrapper">
        <div class="doctor-card__block">
            <div class="doctor-card__content">
                <div
                        class="doctor-card__avatar"
                        :class="{'skeleton': isLoading}"
                >
                    <img :src="doctor.avatar ? pathToImg + doctor.avatar : ''" alt="Not found">
                </div>
                <div class="doctor-card__inner">
                    <div class="doctor-card__main">
                        <div
                                class="doctor-card__full-name"
                                :class="{'skeleton': isLoading}"
                        >
                            <span>
                                {{ doctor.firstName }} {{ doctor.lastName }}
                            </span>
                        </div>
                        <div
                                class="doctor-card__specialties specialties-list"
                                :class="{'skeleton': isLoading}"
                        >
                            <span
                                    v-for="specialty in doctor.specialties"
                                    :key="specialty.id"
                                    class="specialties-list__item"
                            >
                                {{ specialty?.name ?? '' }}
                            </span>
                        </div>
                        <div
                                class="doctor-card__category"
                                :class="{'skeleton': isLoading}"
                        >
                            <span>{{ doctor.categoryName }}</span>
                        </div>
                    </div>
                    <div
                            class="doctor-card__experience experience"
                            :class="{'skeleton': isLoading}"
                    >
                        <span class="experience__number">{{ doctor.experience }}</span>
                        <span class="experience__text">experience</span>
                    </div>
                    <div
                            class="doctor-card__description"
                            :class="{'skeleton': isLoading}"
                    >
                        <p v-if="!isLoading">
                            Engaged in effective treatment of disability, depressive conditions, chronic fatigue
                            syndrome, fears, anxiety, apathy and lethargy, sleep disorders, schizophrenia, mental
                            disorders in the elderly and senile.
                        </p>
                    </div>
                    <div
                            class="doctor-card__price"
                            :class="{'skeleton': isLoading}"
                    >
                        <span>250$</span>
                    </div>
                </div>
            </div>
            <div class="doctor-card__clinics">

            </div>
        </div>
        <div class="doctor-card__block">
            <div class="doctor-card__slots doctor-slots">
                <div
                        class="doctor-slots__title"
                        :class="{'skeleton': isLoading}"
                >
                    <span>Pre-entry</span>
                </div>
                <div
                        class="doctor-slots__select-time"
                        :class="{'skeleton': isLoading}"
                >
                    <span>Select your desired time and wait for confirmation</span>
                </div>
                <div
                        class="doctor-slots__days slots-days"
                        :class="{'skeleton': isLoading}"
                >
                    <div
                            v-for="item in slotsDays"
                            :key="`k-${item.day}`"
                            class="slots-days__item"
                    >
                        <span class="slots-days__week-day">{{ item.day }}</span>
                        <span class="slots-days__date">{{ item.date }}</span>
                    </div>
                </div>
                <ul
                        class="doctor-slots__list visit-time"
                        :class="{'skeleton': isLoading}"
                >
                    <li
                            v-for="item in visitTimes"
                            :key="`k-${item}`"
                            class="visit-time__item"
                    >
                        <span>{{ item }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "DoctorListItem",
    props: {
        doctor: {
            type: Object
        },
        pathToImg: {
            type: String
        },
        slotsDays: {
            required: true
        },
        visitTimes: {
            required: true
        },
        isLoading: {
            default: false
        },
    }
})
</script>

<style scoped lang="scss">

</style>
