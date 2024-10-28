<template>
  <div class="page">
    <img ref="logoImg" alt="Vue logo" src="@/assets/images/logo.png" @click="imgMove()" />
    <div class="scroll-box">
      툴팁 테스트용 박스 <br />
      툴팁 테스트용 박스 <ui-tooltip>툴팁입니다.</ui-tooltip><br />
      툴팁 테스트용 박스 <br />
      툴팁 테스트용 박스 <br />
      툴팁 테스트용 박스 <br />
      툴팁 테스트용 박스 <br />
      툴팁 테스트용 박스 <br />
      툴팁 테스트용 박스 <br />
      툴팁 테스트용 박스 <br />
    </div>
    <div class="table" style="margin: 60vh 0">
      <table>
        <tbody>
          <tr>
            <th scope="row">
              th
              <ui-tooltip>툴팁입니다.</ui-tooltip>
            </th>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
          </tr>
          <tr>
            <th scope="row">th</th>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
          </tr>
          <tr>
            <th scope="row">th</th>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
          </tr>
          <tr>
            <th scope="row">th</th>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
          </tr>
          <tr>
            <th scope="row">
              th
              <ui-tooltip>툴팁입니다.</ui-tooltip>
            </th>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
          </tr>
          <tr>
            <th scope="row">th</th>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
          </tr>
          <tr>
            <th scope="row">th</th>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
          </tr>
          <tr>
            <th scope="row">th</th>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue';
//import { ref, getCurrentInstance } from 'vue';
//const { $anime } = getCurrentInstance().appContext.config.globalProperties;
const $anime = inject('$anime');
const $metaTitle = inject('$metaTitle');
$metaTitle('샘플 페이지');

const logoImg = ref(null);
const logoMoving = ref(false);
function imgMove() {
  if (logoMoving.value) return;
  logoMoving.value = true;
  const logoAnimation = $anime
    .timeline({
      targets: logoImg.value,
      delay: 400,
      duration: 500,
      endDelay: 400,
      easing: 'easeInOutSine',
      update: function (anim) {
        console.log('logo moving : ' + Math.round(anim.progress) + '%');
      }
    })
    .add({
      translateX: 250
    })
    .add({
      scale: 1.5
    })
    .add({
      translateX: 0
    })
    .add({
      scale: 1
    });

  logoAnimation.finished.then(logoAnimationFinished);

  function logoAnimationFinished() {
    logoMoving.value = false;
  }
}
</script>
<script>
export default {
  name: 'MainIndex',
  methods: {}
};
</script>
<style>
.scroll-box {
  height: 100px;
  border: 1px solid #ccc;
  overflow: hidden;
}
</style>
