import { onMounted, onUnmounted } from 'vue';

function useDisableOverscroll() {
  onMounted(() => {
    document.body.classList.add('m-layout-overscroll-none');
    document.documentElement.classList.add('m-layout-overscroll-none');
  });

  onUnmounted(() => {
    document.body.classList.remove('m-layout-overscroll-none');
    document.documentElement.classList.remove('m-layout-overscroll-none');
  });
}

export default useDisableOverscroll;
