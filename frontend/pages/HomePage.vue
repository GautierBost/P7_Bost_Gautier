<template>
  <div class="page">
    <Banner />
    <PublicationForm />
    <Publication :publicationsInfo="this.publications" />
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      publications: [],
    };
  },
  async fetch() {
    const res = await this.$axios.$get(`${process.env.apiUrl}/publications/`);
    this.publications = res;
  },
};
</script>

<style lang="scss" scoped>
.page {
  @include page;
}
</style>
