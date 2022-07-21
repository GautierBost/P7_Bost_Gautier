<template>
  <div class="page">
    <img class="logo" src="/logo.svg" alt="logo" />
    <h1>Groupomania</h1>
    <div class="links">
      <NuxtLink to="Login">Connexion</NuxtLink>
      <NuxtLink to="SignUp">Inscription</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexPage",
  auth: false,
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

.logo {
  width: 200px;
  transform: rotate(0deg);
  transition: 2s cubic-bezier(0.58, -0.48, 0.32, 1.41) transform;
}

.logo:hover {
  transform: rotate(360deg);
}

h1 {
  color: #fd2d01;
  font-size: 100px;
}

.links {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

a {
  text-decoration: none;
  color: #4e5166;
  border-radius: 100vh;
  padding: 10px;
  font-size: 25px;
  background: linear-gradient(to bottom right, #fd2d01, #ffd7d7);
  box-shadow: 0 6px 12px #505050;
  transform: scale(1);
  transition: 500ms transform;
}

a:hover {
  transform: scale(1.2);
}
</style>
