<template>
  <div class="banner">
    <div class="banner__logo">
      <img class="banner__logo__img" src="/logo-name.svg" alt="logo" />
    </div>
    <div class="banner__menu">
      <div
        class="banner__menu__toggle"
        :class="{ isActive: show }"
        @click="toggle"
      >
        <div class="banner__menu__toggle__img-box">
          <img src="/avatar-neutre.jpg" alt="photo de profil" />
        </div>
        <div class="banner__menu__toggle__arrow">
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>
      <transition name="fade">
        <div class="options" v-if="show">
          <NuxtLink to="HomePage">Acceuil</NuxtLink>
          <NuxtLink to="Profil">Mon profil</NuxtLink>
          <NuxtLink to="MyPublications">Mes post</NuxtLink>
          <a href="" @click.prevent="$auth.logout()">Se deconecter</a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggle: function () {
      if (this.show === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 12px #505050;
  margin-bottom: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: $tertiary-color;
  background-color: white;

  &__logo {
    display: flex;
    width: 300px;
    height: 100px;

    &__img {
      width: 100%;
      object-fit: cover;
    }
  }

  &__menu {
    display: flex;
    justify-content: center;
    align-items: center;

    &__toggle {
      width: 100px;
      padding: 5px;
      margin-right: 30px;
      border: 2px solid $tertiary-color;
      border-radius: 100vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: 300ms background-color;

      &:hover {
        background-color: #eeeeee;
      }
      &__img-box {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &.isActive &__arrow {
        transform: rotate(180deg);
      }

      &__arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        width: 30px;
        height: 30px;
        transition: 500ms transform;

        .left {
          width: 8px;
          height: 3px;
          background-color: $tertiary-color;
          transform: rotate(-40deg);
          position: relative;
          left: 2px;
        }

        .right {
          width: 8px;
          height: 3px;
          background-color: $tertiary-color;
          transform: rotate(40deg);
          position: relative;
          left: -2px;
        }
      }
    }

    .options {
      position: fixed;
      right: 0;
      top: 110px;
      font-size: 25px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      @include vignette;
    }

    a {
      margin: 10px;
      color: $tertiary-color;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 1s, transform 1s;
    }

    .fade-enter,
    .fade-leave {
      opacity: 0;
      transform: translateY(20px);
    }
  }
}
</style>
