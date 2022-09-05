<template>
  <div class="publications">
    <div
      class="publication"
      v-for="publication of publicationsInfo"
      :key="publication._id"
    >
      <div class="publication__user">
        <div class="publication__user__img-box">
          <img :src="publication.userProfilePicture" alt="" />
        </div>
        <p class="publication__user__name">{{ publication.userName }}</p>
      </div>
      <div class="publication__content">
        <p class="publication__content__text">{{ publication.content }}</p>
        <div class="publication__content__img-box" v-if="publication.imageUrl">
          <img
            class="publication__content__img-box__img"
            :src="publication.imageUrl"
            alt=""
          />
        </div>
      </div>
      <p v-if="publication.modificationDate" class="publication__date">
        Modifié le {{ formalizedDate(publication.modificationDate) }}
      </p>
      <p v-else class="publication__date">
        Publié le {{ formalizedDate(publication.creationDate) }}
      </p>
      <div class="publication__likes">
        <i
          class="fa-solid fa-thumbs-up"
          :class="{ green: liked(publication._id) }"
          @click="like(publication._id)"
        ></i
        ><span class="number">{{ publication.likes }}</span>
        <i
          class="fa-solid fa-thumbs-down"
          :class="{ red: disliked(publication._id) }"
          @click="dislike(publication._id)"
        ></i
        ><span class="number">{{ publication.dislikes }}</span>
      </div>
      <div
        class="publication__btn"
        v-if="isAuthorized(publication.userId) === true"
      >
        <NuxtLink
          :to="`/modify-publication/${publication._id}`"
          class="publication__btn__modify-btn"
          >Modifier</NuxtLink
        >
        <button
          class="publication__btn__delete-btn"
          @click="deletePublication(publication._id)"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "publications",

  props: ["publicationsInfo"],

  data() {
    return {};
  },

  methods: {
    liked(id) {
      const publication = this.publicationsInfo.filter(
        (item) => item._id == id
      )[0];
      const users = publication.usersLiked;
      return users.includes(this.$auth.$state.user._id);
    },
    disliked(id) {
      const publication = this.publicationsInfo.filter(
        (item) => item._id == id
      )[0];
      const users = publication.usersDisliked;
      return users.includes(this.$auth.$state.user._id);
    },

    formalizedDate(date) {
      const myDate = new Date(date);
      return myDate.toLocaleDateString("fr");
    },

    async like(id) {
      if (this.disliked(id) === true) {
        return;
      } else if (this.liked(id) === false) {
        await this.$axios
          .$post(`${process.env.apiUrl}/publications/${id}/like`, {
            like: 1,
            userId: this.$auth.$state.user._id,
          })
          .then((res) => {
            console.log(res);
            liked(id);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.liked(id) === true) {
        await this.$axios
          .$post(`${process.env.apiUrl}/publications/${id}/like`, {
            like: 0,
            userId: this.$auth.$state.user._id,
          })
          .then((res) => {
            console.log(res);
            liked(id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    async dislike(id) {
      if (this.liked(id) === true) {
        return;
      } else if (this.disliked(id) === false) {
        await this.$axios
          .$post(`${process.env.apiUrl}/publications/${id}/like`, {
            like: -1,
            userId: this.$auth.$state.user._id,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.disliked(id) === true) {
        await this.$axios
          .$post(`${process.env.apiUrl}/publications/${id}/like`, {
            like: 0,
            userId: this.$auth.$state.user._id,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    async deletePublication(id) {
      await this.$axios
        .$delete(`${process.env.apiUrl}/publications/${id}`)
        .then((res) => {
          console.log(res);
          this.$emit("updateDeletedPost", id);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    isAuthorized(id) {
      if (id === this.$auth.$state.user._id) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.publication {
  padding: 10px;
  margin-bottom: 20px;
  width: 800px;
  display: flex;
  flex-direction: column;
  @include vignette;

  &__user {
    display: flex;
    border-bottom: 1px solid black;

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

    &__name {
      font-weight: bold;
      font-size: 20px;
      margin-left: 10px;
    }
  }

  &__content {
    border-bottom: 1px solid black;

    &__img-box {
      width: 200px;
      height: 200px;
      margin-bottom: 15px;
      display: flex;

      &__img {
        width: 100%;
        object-fit: contain;
      }
    }
  }

  &__likes {
    margin: 10px 0;
    align-self: flex-end;

    .fa-solid {
      margin: 0 10px;
      color: $tertiary-color;
      font-size: 25px;
    }

    .green {
      color: green;
    }

    .red {
      color: red;
    }
  }

  &__btn {
    display: flex;

    &__modify-btn {
      font-size: 15px;
      padding: 5px;
      margin: 5px;
      color: black;
      background-color: white;
      border: 2px solid black;
      border-radius: 5px;
      transition: 300ms background-color;

      &:hover {
        background-color: #1a79f7;
        color: white;
      }
    }

    &__delete-btn {
      font-size: 15px;
      padding: 5px;
      margin: 5px;
      background-color: white;
      border: 2px solid black;
      border-radius: 5px;
      transition: 300ms background-color;

      &:hover {
        background-color: red;
        color: white;
      }
    }
  }

  &__date {
    align-self: flex-end;
    font-size: 15px;
    color: #707070;
    margin-bottom: 0;
  }
}

@media screen and (max-width: 900px) {
  .publication {
    width: 600px;
  }
}

@media screen and (max-width: 700px) {
  .publication {
    width: 300px;
  }
}
</style>
