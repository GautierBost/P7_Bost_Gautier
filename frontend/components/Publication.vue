<template>
  <div class="publication">
    <div class="publication__user">
      <div class="publication__user__img-box">
        <img src="/avatar-neutre.jpg" alt="" />
      </div>
      <p class="publication__user__name">pseudo</p>
    </div>
    <div class="publication__content">
      <p class="publication__content__text">blabla</p>
      <div class="publication__content__img-box">
        <img
          class="publication__content__img-box__img"
          src="/avatar-neutre.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="publication__likes">
      <i class="fa-solid fa-thumbs-up"></i><span class="number">0</span>
      <i class="fa-solid fa-thumbs-down"></i><span class="number">0</span>
    </div>
    <div class="publication__btn">
      <button class="publication__btn__modify-btn">Modifier</button>
      <button class="publication__btn__delete-btn">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "publication",
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
      width: 300px;
      height: 100px;
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
  }

  &__btn {
    display: flex;

    button {
      font-size: 15px;
      padding: 5px;
      margin: 5px;
      background-color: white;
      border-radius: 5px;
      transition: 300ms background-color;
    }

    &__modify-btn:hover {
      background-color: #1a79f7;
      color: white;
    }

    &__delete-btn:hover {
      background-color: red;
      color: white;
    }
  }
}
</style>
