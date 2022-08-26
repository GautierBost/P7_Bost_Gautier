<template>
  <div class="page">
    <PublicationForm
      :type="formType"
      @updateNewPost="addNewPostToPublications"
    />
    <Publications
      :publicationsInfo="publications"
      @updateDeletedPost="removeDeletedPost"
    />
  </div>
</template>

<script>
export default {
  name: "home-page",
  data() {
    return {
      publications: [],
      formType: "Publier",
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
      this.publications.unshift(newPost);
      console.log(
        "🚀 ~ file: home-page.vue ~ line 29 ~ addNewPostToPublications ~ this.publications",
        this.publications
      );
    },

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
