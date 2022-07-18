<template>
  <form class="form" method="post" @submit.prevent="checkForm">
    <h2>{{ type }}</h2>
    <div class="inputs">
      <div class="email">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" />
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <p class="error" v-if="error">{{ error }}</p>
    </div>
    <button type="submit">{{ type }}</button>
  </form>
</template>

<script>
export default {
  props: ["type", "route"],
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async submitForm() {
      await this.$axios
        .$post(`http://localhost3000/api/auth/${this.route}`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.goLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    checkForm: function () {
      if (!this.email) {
        this.error = "Email requis";
      } else if (!this.validEmail(this.email)) {
        this.error = "Email invalide";
      } else if (!this.password) {
        this.error = "Mot de passe requis";
      } else if (!this.validPassword(this.password)) {
        this.error =
          "Votre mot de passe doit contenir au moins 6 caractères dont 1 majascule 1 minuscule et 1 chiffre";
      } else {
        this.submitForm();
      }
    },
    validEmail: function (email) {
      var re = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/g;
      return re.test(email);
    },
    validPassword: function (password) {
      var re = /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/g;
      return re.test(password);
    },

    goLogin: function () {
      this.$router.push("/Login");
    },
  },
};
</script>

<style scoped>
.form {
  border-radius: 15px;
  box-shadow: 0 8px 15px #505050;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  background-color: white;
}

h2 {
  color: #fd2d01;
  margin-left: 10px;
  font-size: 30px;
}

.inputs {
  border-top: 2px solid #cccccc;
  border-bottom: 2px solid #cccccc;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.email,
.password {
  margin: 10px 100px 10px 0;
  align-self: flex-end;
}

input {
  height: 25px;
}

.error {
  color: red;
  margin: 10px;
}

button {
  font-family: inherit;
  color: #4e5166;
  margin: 10px;
  padding: 5px;
  align-self: flex-end;
  border-radius: 10px;
  background-color: #ffd7d7;
  font-size: 20px;
  transition-property: background-color;
  transition-duration: 300ms;
}

button:hover {
  background-color: #ffb7b7;
}
</style>
