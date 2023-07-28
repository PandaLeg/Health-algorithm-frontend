<template>
  <div class="clinic-card__wrapper">
    <div class="clinic-card__content">
      <div class="clinic-card__avatar">
        <img :src="avatar" alt="Not found">
      </div>
      <div class="clinic-card__inner">
        <div class="clinic-card__name">
                <span>
                  Milner Medical
                </span>
        </div>
        <div class="clinic-card__type">
                <span>
                  Medical center
                </span>
        </div>
        <div class="clinic-card__description">
          <p>
            Engaged in effective treatment of disability, depressive conditions, chronic fatigue
            syndrome, fears, anxiety, apathy and lethargy, sleep disorders, schizophrenia, mental
            disorders in the elderly and senile.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClinicListItem",
  props: {
    avatar: {type: String, required: true}
  }
}
</script>

<style scoped lang="scss">

</style>
