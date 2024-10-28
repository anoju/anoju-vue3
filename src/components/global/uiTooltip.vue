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
    left: rect.left,
    top: rect.top
  };
};

const setStyle = () => {
  if (!isShow.value) return;
  const $wrap = wrapper.value;
  const $content = content.value;
  if ($wrap && $content) {
    let tooltipBtn = $wrap.querySelector('.tooltip-btn');
    if (!tooltipBtn) {
      const $head = $wrap.querySelector('.tooltip-head');
      if ($head && $head.firstElementChild) tooltipBtn = $head.firstElementChild;
    }
    const $btnWidth = tooltipBtn.offsetWidth;
    const $contentWidth = $content.offsetWidth;
    let $left = getOffset(tooltipBtn).left + $btnWidth / 2 - $contentWidth / 2;
    let $arrLeft = $contentWidth / 2;
    const $leftMargin = 20;
    if ($left < $leftMargin) {
      $arrLeft = $arrLeft - ($leftMargin - $left);
      $left = $leftMargin;
    }
    const $btnHeight = tooltipBtn.offsetHeight;
    const $top = getOffset(tooltipBtn).top + $btnHeight;
    // contentWidth.value = document.body.clientWidth;
    contentLeft.value = $left;
    contentTop.value = $top;
    arrLeft.value = $arrLeft;
  }
};

const findScrllParent = (element) => {
  // 엘리먼트가 없거나 html/body까지 올라갔다면 null 반환
  if (!element || element === document.documentElement || element === document.body) return null;

  // 요소의 스타일 가져오기
  const style = window.getComputedStyle(element);
  const overflowY = style.getPropertyValue('overflow-y');
  const hasVerticalScroll = /(auto|scroll)/.test(overflowY) && element.scrollHeight > element.clientHeight;

  // 현재 요소가 스크롤 가능하다면 반환
  if (hasVerticalScroll) return element;

  // 아니라면 부모 요소에서 재귀적으로 검색
  return findScrllParent(element.parentElement);
};

//const contentWidth = ref(0);
const contentLeft = ref(0);
const contentTop = ref(0);
const contentStyle = computed(() => {
  const $obj = {};
  //if (contentWidth.value) $obj.width = contentWidth.value + 'px';
  if (contentLeft.value) $obj.left = contentLeft.value + 'px';
  if (contentTop.value) $obj.top = contentTop.value + 'px';
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
  isShow.value = true;
  setTimeout(() => {
    isOpen.value = true;
    setStyle();
  });

  window.addEventListener('resize', setStyle);
  window.addEventListener('scroll', setStyle);
  const sclEl = findScrllParent(wrapper.value);
  if (sclEl) {
    sclEl.addEventListener('scroll', setStyle);
  }
};

const onClose = () => {
  isOpen.value = false;

  window.removeEventListener('resize', setStyle);
  window.removeEventListener('scroll', setStyle);
  const sclEl = findScrllParent(wrapper.value);
  if (sclEl) {
    sclEl.removeEventListener('scroll', setStyle);
  }
};

const bodyTransitionEnd = () => {
  if (!isOpen.value) isShow.value = false;
};

const slots = useSlots();

onMounted(() => {
  const $wrap = wrapper.value;
  const $content = content.value;
  // if ($content) contentWidth.value = document.body.clientWidth;
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
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  if (isOpen.value) {
    window.removeEventListener('resize', setStyle);
    window.removeEventListener('scroll', setStyle);
    const sclEl = findScrllParent(wrapper.value);
    if (sclEl) {
      sclEl.removeEventListener('scroll', setStyle);
    }
  }
});
</script>
