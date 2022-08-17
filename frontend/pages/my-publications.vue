<template>
  <div class="page">
    <Publication :publicationsInfo="this.publications" />
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
export default {
  components: { Banner },
  name: "my-publications",
  data() {
    return {
      publications: [],
    };
  },
  async fetch() {
    const res = await this.$axios.$get(
      `${process.env.apiUrl}/publications/${this.$auth.$state.user._id}`
    );
    this.publications = res.sort(function (a, b) {
      return b.creationDate - a.creationDate;
    });
  },
};
</script>

<style lang="scss" scoped>
.page {
  @include page;
  padding-top: 120px;
}
</style>
