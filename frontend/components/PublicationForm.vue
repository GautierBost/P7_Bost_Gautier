<template>
  <form class="form" method="post" ref="form" @submit.prevent="submitForm">
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
    <button class="form__button" type="submit">{{ type }}</button>
  </form>
</template>

<script>
export default {
  name: "publication-form",

  props: ["type", "publicationId"],

  data() {
    return {
      publication: {
        content: "",
        userId: this.$auth.$state.user._id,
      },
      images: null,
    };
  },

  computed: {
    isReady() {
      return this.publication.content != "" || this.images != null;
    },
  },

  methods: {
    uploadFile() {
      this.images = this.$refs.file.files[0];
    },
    async submitForm() {
      if (!this.isReady) {
        return;
      }
      const formData = new FormData();
      formData.append("publication", JSON.stringify(this.publication));
      if (this.images) {
        formData.append("image", this.images);
      }
      const headers = { "Content-Type": "multipart/form-data" };
      if (this.type === "Publier") {
        await this.$axios
          .$post(`${process.env.apiUrl}/publications`, formData, {
            headers,
          })
          .then((res) => {
            console.log(res);
            this.$emit("updateNewPost", res);
            this.publication.content = "";
            this.images = null;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await this.$axios
          .$put(
            `${process.env.apiUrl}/publications/${this.publicationId}`,
            formData,
            {
              headers,
            }
          )
          .then((res) => {
            console.log(res);
            this.$router.push("/home-page");
          })
          .catch((err) => {
            console.log(err);
          });
      }
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

@media screen and (max-width: 900px) {
  .form {
    width: 600px;
  }
}

@media screen and (max-width: 700px) {
  .form {
    width: 300px;
  }
}
</style>
