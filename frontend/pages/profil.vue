<template>
  <div class="page">
    <div class="user-info">
      <div class="user-info__profile-picture">
        <img :src="$auth.$state.user.profilePicture" alt="photo de profil" />
      </div>
      <p class="user-info__name">{{ $auth.$state.user.name }}</p>
    </div>
    <form class="form" method="post" @submit.prevent="checkForm">
      <div class="form__name">
        <label for="name">Changer de nom d'utilisateur</label>
        <input type="text" v-model="userInfo.name" id="name" />
        <p class="error" v-if="error">{{ error }}</p>
      </div>
      <div class="form__profile-picture">
        <label for="profile-picture">Changer votre photo de profil</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref="file"
          @change="uploadFile"
          id="profile-picture"
        />
      </div>
      <button class="form__button" type="submit">Modifier</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "profil",
  data() {
    return {
      name: this.$auth.$state.user.name,
      profilePicture: this.$auth.$state.user.profilePicture,
      userInfo: {
        name: "",
      },
      image: null,
      error: "",
    };
  },

  computed: {
    isReady() {
      return this.userInfo.name != "" || this.image != null;
    },
  },

  methods: {
    uploadFile() {
      this.image = this.$refs.file.files[0];
    },

    checkForm() {
      if (this.userInfo.name != "" && !this.validName(this.userInfo.name)) {
        this.error = "Nom d'utilisateur invalide";
      } else {
        this.error = "";
        this.submitForm();
      }
    },

    async submitForm() {
      if (!this.isReady) {
        return;
      }
      const formData = new FormData();
      const headers = { "Content-Type": "multipart/form-data" };
      formData.append("image", this.image);
      if (this.userInfo.name !== "") {
        formData.append("userInfo", JSON.stringify(this.userInfo));
      }
      await this.$axios
        .$patch(
          `${process.env.apiUrl}/auth/${this.$auth.$state.user._id}`,
          formData,
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res);
          this.$auth.setUser(res);
          // this.name = res.name;
          // this.profilePicture = res.profilePicture;
          this.userInfo.name = "";
          this.image = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    validName(name) {
      const re =
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,30}$/g;
      return re.test(name);
    },
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
    padding: 0 20px;
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

  .error {
    color: red;
    margin: 10px 0 0 0;
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

@media screen and (max-width: 500px) {
  .user-info {
    flex-direction: column;
  }

  .form {
    width: 300px;
  }
}
</style>
