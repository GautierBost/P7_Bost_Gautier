<template>
  <div class="page">
    <Banner />
    <div class="user-info">
      <div class="user-info__profile-picture">
        <img :src="profilePicture" alt="photo de profil" />
      </div>
      <p class="user-info__name">{{ name }}</p>
    </div>
    <form class="form" method="post">
      <div class="form__name">
        <label for="name">Changer de nom d'utilisateur</label>
        <input type="text" id="name" />
      </div>
      <div class="form__profile-picture">
        <label for="profile-picture">Changer votre photo de profil</label>
        <input type="file" id="profile-picture" />
      </div>
      <button class="form__button" type="submit">Modifier</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Profil",
  data() {
    return {
      name: this.$auth.$state.user.name,
      profilePicture: this.$auth.$state.user.profilePicture,
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  @include page;
}

.user-info {
  display: flex;
  margin: 50px 10px;
  align-items: center;

  &__profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__name {
    margin-left: 20px;
    font-size: 30px;
  }
}

.form {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 6px 12px #505050;

  &__name {
    display: flex;
    flex-direction: column;
    margin: 15px;
    font-size: 20px;

    input {
      font-size: 20px;
      border-radius: 5px;
    }
  }

  &__profile-picture {
    display: flex;
    flex-direction: column;
    margin: 15px;
    font-size: 20px;
  }

  label {
    margin-bottom: 10px;
  }

  &__button {
    width: 50%;
    padding: 5px;
    align-self: center;
    border-radius: 5px;
    font-size: 15px;
    background-color: $secondary-color;
    transition: 300ms background-color;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }
}
</style>
