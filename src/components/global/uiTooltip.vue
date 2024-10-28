<template>
  <div ref="wrapper" class="tooltip-wrap" :class="tooltipClass" @click.stop>
    <div class="tooltip-head">
      <ui-button v-if="!$slots.btn" no-effect not class="tooltip-btn" aria-label="자세한 내용 확인" v-bind="$attrs">
        <i class="i-ico-tooltip"></i>
      </ui-button>
      <slot name="btn" />
    </div>
    <div v-if="!!$slots.default" ref="content" class="tooltip-body" :class="{ show: isShow, open: isOpen }" :style="contentStyle" role="tooltip" @transitionend="bodyTransitionEnd">
      <i class="tooltip-arr" :style="arrStyle" aria-hidden="true"></i>
      <div class="tooltip-inner">
        <slot />
        <ui-button not class="tooltip-close" aria-label="툴팁닫기" @click="onClose" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onUnmounted, useSlots, defineProps } from 'vue';

// props
const props = defineProps({
  class: {
    type: [String, Array],
    default: null
  }
});

const wrapper = ref(null);
const content = ref(null);
const isShow = ref(false);
const isOpen = ref(false);

const tooltipClass = computed(() => {
  let rtnAry = [props.class];
  return rtnAry;
});

const handleClickOutside = (event) => {
  if (wrapper.value && !wrapper.value.contains(event.target)) {
    onClose();
  }
};

// getOffset 유틸리티 함수
const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
};

const setStyle = () => {
  const $wrap = wrapper.value;
  const $content = content.value;
  if ($wrap && $content) {
    let tooltipBtn = $wrap.querySelector('.tooltip-btn');
    if (!tooltipBtn) {
      const $head = $wrap.querySelector('.tooltip-head');
      if ($head && $head.firstElementChild) tooltipBtn = $head.firstElementChild;
    }
    const $left = getOffset(tooltipBtn).left;
    contentWidth.value = document.body.clientWidth;
    contentLeft.value = $left * -1;
    arrLeft.value = $left + tooltipBtn.offsetWidth / 2;
  }
};

const contentWidth = ref(0);
const contentLeft = ref(0);
const contentStyle = computed(() => {
  const $obj = {};
  if (contentWidth.value) $obj.width = contentWidth.value + 'px';
  if (contentLeft.value) $obj.left = contentLeft.value + 'px';
  return $obj;
});

const arrLeft = ref(0);
const arrStyle = computed(() => {
  const $obj = {};
  if (arrLeft.value) $obj.left = arrLeft.value + 'px';
  return $obj;
});

watch(isShow, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

const onOpen = () => {
  setStyle();
  isShow.value = true;
  setTimeout(() => {
    isOpen.value = true;
  });
};

const onClose = () => {
  isOpen.value = false;
};

const bodyTransitionEnd = () => {
  if (!isOpen.value) isShow.value = false;
};

const slots = useSlots();

onMounted(() => {
  const $wrap = wrapper.value;
  const $content = content.value;
  if ($content) contentWidth.value = document.body.clientWidth;
  if ($wrap) {
    if (slots.btn) {
      const $head = $wrap.querySelector('.tooltip-head');
      if ($head && $head.firstElementChild) $head.firstElementChild.classList.add('tooltip-btn');
    }
    const tooltipBtn = $wrap.querySelector('.tooltip-btn');
    if (tooltipBtn) {
      tooltipBtn.addEventListener('click', () => {
        if ($content) {
          if (isShow.value) {
            onClose();
          } else {
            onOpen();
          }
        }
      });
    }
    if ($content) window.addEventListener('resize', setStyle);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', setStyle);
});
</script>
