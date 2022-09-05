<template>
  <div class="page">
    <Publications
      :publicationsInfo="publications"
      @updateDeletedPost="removeDeletedPost"
    />
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
      `${process.env.apiUrl}/publications/user/${this.$auth.$state.user._id}/publications`
    );
    this.publications = res.sort(function (a, b) {
      return b.creationDate - a.creationDate;
    });
  },
  methods: {
    removeDeletedPost(id) {
      console.log(
        "🚀 ~ file: home-page.vue ~ line 39 ~ removeDeletedPost ~ id",
        id
      );
      this.publications = this.publications.filter((item) => item._id != id);
      console.log(
        "🚀 ~ file: home-page.vue ~ line 40 ~ removeDeletedPost ~ this.publications",
        this.publications
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  @include page;
  padding-top: 120px;
}
</style>
