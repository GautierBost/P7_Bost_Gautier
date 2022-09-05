<template>
  <div class="page">
    <img class="page__logo" src="/logo.svg" alt="logo" />
    <h1 class="page__title">Groupomania</h1>
    <div class="page__links">
      <NuxtLink to="login">Connexion</NuxtLink>
      <NuxtLink to="signup">Inscription</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexPage",
  layout: "before-login",
  auth: false,
};
</script>

<style lang="scss" scoped>
.page {
  @include page;

  &__logo {
    width: 200px;
    margin-bottom: 65px;
    transform: rotate(0deg);
    transition: 2s cubic-bezier(0.58, -0.48, 0.32, 1.41) transform;

    &:hover {
      transform: rotate(360deg);
    }
  }

  &__title {
    color: $primary-color;
    font-size: 100px;
    margin: 0;
  }

  &__links {
    width: 100%;
    margin-top: 65px;
    display: flex;
    justify-content: space-evenly;
  }

  a {
    text-decoration: none;
    color: $tertiary-color;
    border-radius: 100vh;
    padding: 10px;
    font-size: 25px;
    background: linear-gradient(
      to bottom right,
      $primary-color,
      $secondary-color
    );
    box-shadow: 0 6px 12px #505050;
    transform: scale(1);
    transition: 500ms transform;

    &:hover {
      transform: scale(1.2);
    }
  }
}

@media screen and (max-width: 650px) {
  .page__title {
    font-size: 50px;
  }
}
</style>
