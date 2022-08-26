<template>
  <div class="page">
    <PublicationForm
      :type="formType"
      :publicationId="this.$route.params.publication"
    />
  </div>
</template>

<script>
export default {
  name: "modify-publication",

  data() {
    return {
      formType: "Modifier",
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  @include page;
}
</style>
