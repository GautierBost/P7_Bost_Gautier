<template>
  <div class="page">
    <PublicationForm
      :type="formType"
      :publicationId="this.$route.params.publication"
      @updatePost="updatePost"
    />
    <div class="publication">
      <div class="publication__user">
        <div class="publication__user__img-box">
          <img :src="publication.userProfilePicture" alt="" />
        </div>
        <p class="publication__user__name">{{ publication.userName }}</p>
      </div>
      <div class="publication__content">
        <p class="publication__content__text">{{ publication.content }}</p>
        <div class="publication__content__img-box" v-if="publication.imageUrl">
          <img
            class="publication__content__img-box__img"
            :src="publication.imageUrl"
            alt=""
          />
        </div>
      </div>
      <p v-if="publication.modificationDate" class="publication__date">
        Modifié le {{ formalizedDate(publication.modificationDate) }}
      </p>
      <p v-else class="publication__date">
        Publié le {{ formalizedDate(publication.creationDate) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "modify-publication",

  data() {
    return {
      formType: "Modifier",
      publication: {},
    };
  },
  async fetch() {
    const res = await this.$axios.$get(
      `${process.env.apiUrl}/publications/${this.$route.params.publication}`
    );
    this.publication = res;
  },
  methods: {
    formalizedDate(date) {
      let myDate = new Date(date);
      return myDate.toLocaleDateString("fr");
    },

    updatePost(post) {
      this.publication = post;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  @include page;
  padding-top: 120px;
}
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
      width: 200px;
      height: 200px;
      margin-bottom: 15px;
      display: flex;

      &__img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
  &__date {
    align-self: flex-end;
    font-size: 15px;
    color: #707070;
    margin-bottom: 0;
  }
}
</style>
