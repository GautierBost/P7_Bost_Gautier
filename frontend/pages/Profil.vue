<template>
  <div class="page">
    <Banner />
    <div class="userInfo">
      <div class="profil-img">
        <img src="/avatar-neutre.jpg" alt="photo de profil" />
      </div>
      <p class="pseudo">Pseudo</p>
    </div>
    <form class="form" method="post">
      <div class="userName">
        <label for="userName">Changer de pseudo</label>
        <input type="text" id="userName" />
      </div>
      <div class="profilPicture">
        <label for="profilPicture">Changer votre photo de profil</label>
        <input type="file" id="profilPicture" />
      </div>
      <button type="submit">Modifier</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Profil",
};
</script>

<style>
.page {
  background-color: #eeeeee;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userInfo {
  display: flex;
  margin: 200px 10px 50px 10px;
  align-items: center;
}

.profil-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.profil-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pseudo {
  margin-left: 20px;
  font-size: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 6px 12px #505050;
}

.userName {
  display: flex;
  flex-direction: column;
  margin: 15px;
  font-size: 20px;
}

.profilPicture {
  display: flex;
  flex-direction: column;
  margin: 15px;
  font-size: 20px;
}

label {
  margin-bottom: 10px;
}
</style>
