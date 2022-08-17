<template>
  <div class="page">
    <PublicationForm @updateNewPost="addNewPostToPublications" />
    <Publication :publicationsInfo="publications" />
  </div>
</template>

<script>
export default {
  name: "home-page",
  data() {
    return {
      publications: [],
    };
  },
  async fetch() {
    const res = await this.$axios.$get(`${process.env.apiUrl}/publications/`);
    this.publications = res.sort(function (a, b) {
      return b.creationDate - a.creationDate;
    });
  },
  methods: {
    addNewPostToPublications(newPost) {
      console.log(
        "🚀 ~ file: home-page.vue ~ line 24 ~ addNewPostToPublications ~ newPost",
        newPost
      );
      this.publications.pop(newPost);
      console.log(
        "🚀 ~ file: home-page.vue ~ line 29 ~ addNewPostToPublications ~ this.publications",
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
