<template>
  <form class="form" method="post" @submit.prevent="submitForm">
    <label class="form__label" for="publication"
      >Écrivez quelque chose...</label
    >
    <textarea
      class="form__text"
      name="publication"
      id="publication"
      cols="30"
      rows="10"
      v-model="publication.content"
    ></textarea>
    <input
      class="form__file"
      type="file"
      accept=".jpg, .jpeg, .png, .gif"
      ref="file"
      @change="uploadFile"
    />
    <button class="form__button" type="submit">Publier</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      publication: {
        content: "",
        userId: this.$auth.$state.user._id,
        userName: this.$auth.$state.user.name,
        userProfilePicture: this.$auth.$state.user.profilePicture,
        creationDate: 0,
      },
      images: null,
    };
  },

  methods: {
    setDate() {
      this.publication.creationDate = Date.now();
    },

    uploadFile() {
      this.images = this.$refs.file.files[0];
    },
    async submitForm() {
      this.setDate();
      const formData = new FormData();
      formData.append("publication", JSON.stringify(this.publication));
      formData.append("image", this.images);
      const headers = { "Content-Type": "multipart/form-data" };

      await this.$axios
        .$post(`${process.env.apiUrl}/publications`, formData, {
          headers,
        })
        .then((res) => {
          console.log(res);
          this.$emit("updateNewPost", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  margin: 0px 0 20px 0;
  padding: 10px;
  width: 800px;
  @include vignette;

  &__label {
    padding: 10px;
    color: $tertiary-color;
  }

  &__text {
    padding: 10px;
    border: 1.5px solid $tertiary-color;
    border-radius: 5px;
    resize: none;
    font-size: 15px;
    font-family: "Lato", sans-serif;
  }

  &__file {
    border-radius: 5px;
    padding: 5px;
  }

  &__button {
    padding: 5px;
    font-size: 15px;
    border-radius: 5px;
    background-color: $secondary-color;
    width: 200px;
    align-self: center;
    transition: 300ms background-color;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }
}
</style>
