<template>
  <div class="w">
    <div class="title">
      <h1 class="txt-h3">Страница не найдена</h1>
    </div>
    <div class="pic"></div>
  </div>
</template>

<style lang="scss">
.title {
  display: flex;
  justify-content: center;
  height: 80vh;
  align-items: center;
}
@media screen and (max-width: 900px) {
  .title {
    height: 20vh;
    .txt-h3 {
      font-size: 26px;
    }
  }
}
.pic {
  position: fixed;
  left: -80px;
  bottom: 0;
  width: 500px;
  height: 500px;
  background: url("../assets/png/404.png") no-repeat center 104px;
  background-size: 70%;
}
</style>
