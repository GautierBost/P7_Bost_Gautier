<template>
  <div class="page">
    <div class="block">
      <Auth :type="authType" :submitForm="submitForm" :servError="servError" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
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
          this.$router.push("/HomePage");
        })
        .catch((err) => {
          console.log(err);
          this.servError = err.message;
        });
    },
  },
};
</script>

<style scoped>
.page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
}

.block {
  width: 400px;
}
</style>
