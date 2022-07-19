<template>
  <form class="form" method="post">
    <label for="publication">Écrivez quelque chose...</label>
    <textarea
      name="publication"
      id="publication"
      cols="30"
      rows="10"
    ></textarea>
    <input class="file" type="file" accept=".jpg, .png, .gif" />
    <button class="button" type="submit">Publier</button>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  margin: 120px 0 0 20px;
  padding: 10px;
  width: 800px;
  box-shadow: 0 2px 5px #505050;
  border-radius: 10px;
  background-color: white;
}

label {
  padding: 10px;
  color: #4e5166;
}

#publication {
  padding: 10px;
  border: 1.5px solid #4e5166;
  border-radius: 5px;
  resize: none;
  font-size: 15px;
  font-family: "Lato", sans-serif;
  color: #4e5166;
}

.file {
  border-radius: 5px;
  padding: 5px;
}

.button {
  padding: 5px;
  border-radius: 5px;
  color: #4e5166;
  background-color: #ffd7d7;
  width: 200px;
  align-self: center;
  transition: 300ms background-color;
}

.button:hover {
  background-color: #ffb7b7;
}
</style>
