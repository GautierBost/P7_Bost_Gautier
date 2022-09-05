<template>
  <div class="page">
    <div class="block">
      <Auth :type="authType" :submitForm="submitForm" :servError="servError" />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  layout: "before-login",
  auth: false,
  data() {
    return {
      authType: "Connexion",
      servError: "",
    };
  },
  methods: {
    async submitForm(userInfo) {
      await this.$auth
        .loginWith("local", {
          data: userInfo,
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/home-page");
        })
        .catch((err) => {
          console.log(err);
          this.servError = err.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  @include page;
}

.block {
  width: 400px;
}

@media screen and (max-width: 450px) {
  .block {
    width: 300px;
  }
}
</style>
