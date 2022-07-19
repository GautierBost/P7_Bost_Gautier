<template>
  <div class="banner">
    <div class="img-box">
      <img class="logo" src="/logo-name.svg" alt="logo" />
    </div>
    <div class="menu">
      <div class="toggle" @click="toggle">
        <div class="profil-img">
          <img src="/avatar-neutre.jpg" alt="photo de profil" />
        </div>
        <div class="arrow">
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>
      <transition name="fade">
        <div class="options" v-if="show">
          <a>profil</a>
          <a>mes post</a>
          <a>se deconecter</a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
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

<style scoped>
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
  color: #4e5166;
  background-color: white;
}

.img-box {
  display: flex;
  width: 300px;
  height: 100px;
}

.logo {
  width: 100%;
  object-fit: cover;
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle {
  width: 100px;
  padding: 5px;
  margin-right: 30px;
  border: 2px solid #4e5166;
  border-radius: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 300ms background-color;
}

.toggle:hover {
  background-color: #eeeeee;
}
.profil-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.profil-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 30px;
  height: 30px;
}

.arrow:focus {
  transform: rotate(180deg);
}

.left {
  width: 8px;
  height: 3px;
  background-color: #4e5166;
  transform: rotate(-40deg);
  position: relative;
  left: 2px;
}

.right {
  width: 8px;
  height: 3px;
  background-color: #4e5166;
  transform: rotate(40deg);
  position: relative;
  left: -2px;
}

.options {
  position: fixed;
  right: 0;
  top: 110px;
  border-radius: 10px;
  box-shadow: 0 6px 12px #505050;
  font-size: 25px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  background-color: white;
}

a {
  padding: 10px;
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
</style>
