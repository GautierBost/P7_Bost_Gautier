<template>
  <div class="page">
    <Banner />
    <PublicationForm />
    <Publication />
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style lang="scss" scoped>
.page {
  @include page;
}
</style>
