<template>
  <div class="page">
    <div class="block">
      <Auth :type="authType" :route="route" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      authType: "Connexion",
      route: "login",
    };
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
