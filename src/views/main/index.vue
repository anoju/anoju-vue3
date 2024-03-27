<template>
  <img ref="logoImg" alt="Vue logo" src="@/assets/images/logo.png" @click="imgMove()" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>
<script setup>
import { ref, inject } from 'vue';
//import { ref, getCurrentInstance } from 'vue';
//const { $anime } = getCurrentInstance().appContext.config.globalProperties;
const $anime = inject('$anime');
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
