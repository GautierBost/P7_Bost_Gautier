<template>
  <form class="form" method="post" @submit.prevent="checkForm">
    <h2 class="form__title">{{ type }}</h2>
    <div class="form__inputs">
      <div class="form__inputs__email">
        <label for="email">Email</label>
        <input type="email" v-model="userInfo.email" id="email" />
      </div>
      <div class="form__inputs__password">
        <label for="password">Password</label>
        <input :type="inputType" v-model="userInfo.password" id="password" />
      </div>
      <i class="fa-solid fa-eye-slash" @click="showPassword"></i>
      <div class="form__inputs__name" v-if="signUp === true">
        <label for="name">Nom d'utilisateur</label>
        <input type="text" v-model="userInfo.name" id="name" />
      </div>
      <p class="error" v-if="error">{{ error }}</p>
      <p class="error" v-if="servError">{{ servError }}</p>
    </div>
    <button class="form__button" type="submit">{{ type }}</button>
  </form>
</template>

<script>
export default {
  name: "auth",
  props: ["type", "submitForm", "servError", "signUp"],
  data() {
    return {
      userInfo: {
        email: "",
        password: "",
        name: "",
      },
      error: "",
      inputType: "password",
    };
  },
  methods: {
    checkForm: function () {
      if (!this.userInfo.email) {
        this.error = "Email requis";
      } else if (!this.validEmail(this.userInfo.email)) {
        this.error = "Email invalide";
      } else if (!this.userInfo.password) {
        this.error = "Mot de passe requis";
      } else if (!this.validPassword(this.userInfo.password)) {
        this.error =
          "Votre mot de passe doit contenir au moins 6 caractères dont 1 majascule 1 minuscule et 1 chiffre";
      } else if (this.signUp === true) {
        if (!this.userInfo.name) {
          this.error = "Nom d'utilisateur requis";
        } else if (!this.validName(this.userInfo.name)) {
          this.error = "Nom d'utilisateur invalide";
        }
      } else {
        this.error = "";
        this.submitForm(this.userInfo);
      }
    },
    validEmail: function (email) {
      const re = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/g;
      return re.test(email);
    },
    validPassword: function (password) {
      const re = /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/g;
      return re.test(password);
    },
    validName: function (name) {
      const re =
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,30}$/g;
      return re.test(name);
    },

    showPassword: function () {
      if (this.inputType === "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  @include vignette;
  display: flex;
  flex-direction: column;
  font-size: 18px;

  &__title {
    color: $primary-color;
    margin-left: 10px;
    font-size: 30px;
  }

  &__inputs {
    border-top: 2px solid #cccccc;
    border-bottom: 2px solid #cccccc;
    display: flex;
    flex-direction: column;
    padding: 20px 0;

    &__email,
    &__password,
    &__name {
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      align-self: center;
    }

    input {
      height: 25px;
    }
  }

  i {
    position: relative;
    top: -35px;
    left: 310px;
  }

  .error {
    color: red;
    margin: 10px;
  }

  &__button {
    font-family: inherit;
    font-size: 20px;
    color: $tertiary-color;
    margin: 10px;
    padding: 5px;
    align-self: flex-end;
    border-radius: 10px;
    background-color: $secondary-color;
    transition-property: background-color;
    transition-duration: 300ms;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }
}
</style>
