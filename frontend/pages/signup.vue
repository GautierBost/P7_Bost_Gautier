<template>
  <div class="page">
    <div class="block">
      <Auth
        :type="authType"
        :submitForm="submitForm"
        :servError="servError"
        :signUp="signUp"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "signup",
  layout: "before-login",
  auth: false,
  data() {
    return {
      authType: "Inscription",
      servError: "",
      signUp: true,
    };
  },
  methods: {
    async submitForm(userInfo) {
      await this.$axios
        .$post(`http://localhost:3000/api/auth/signup`, userInfo)
        .then((response) => {
          console.log(response);
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          this.servError = err;
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
</style>
