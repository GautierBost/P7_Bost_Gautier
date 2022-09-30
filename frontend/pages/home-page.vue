<template>
  <div class="page">
    <PublicationForm
      :type="formType"
      @updateNewPost="addNewPostToPublications"
    />
    <Publications
      :publicationsInfo="publications"
      @updateDeletedPost="removeDeletedPost"
      @updatePublication="updatePublication"
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
    updatePublication(newPublication) {
      this.publications = this.publications.map((publication) => {
        if (publication._id === newPublication._id) {
          return newPublication;
        }
        return publication;
      });
    },

    addNewPostToPublications(newPost) {
      this.publications.unshift(newPost);
    },

    removeDeletedPost(id) {
      this.publications = this.publications.filter((item) => item._id != id);
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
