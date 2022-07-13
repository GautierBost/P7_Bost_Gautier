<template>
  <form class="form" method="post">
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
    </div>
    <button>{{ type }}</button>
  </form>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      email: "",
      password: "",
    };
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
