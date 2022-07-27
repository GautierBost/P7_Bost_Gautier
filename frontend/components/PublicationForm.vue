<template>
  <form class="form" method="post" @submit.prevent="submitForm">
    <label for="publication">Écrivez quelque chose...</label>
    <textarea
      name="publication"
      id="publication"
      cols="30"
      rows="10"
      v-model="content"
    ></textarea>
    <input class="file" type="file" accept=".jpg, .jpeg, .png, .gif" />
    <button class="button" type="submit">Publier</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  margin: 120px 0 20px 0;
  padding: 10px;
  width: 800px;
  @include vignette;
}

label {
  padding: 10px;
  color: $tertiary-color;
}

#publication {
  padding: 10px;
  border: 1.5px solid $tertiary-color;
  border-radius: 5px;
  resize: none;
  font-size: 15px;
  font-family: "Lato", sans-serif;
}

.file {
  border-radius: 5px;
  padding: 5px;
}

.button {
  padding: 5px;
  border-radius: 5px;
  background-color: $secondary-color;
  width: 200px;
  align-self: center;
  transition: 300ms background-color;
}

.button:hover {
  background-color: darken($secondary-color, 10%);
}
</style>
