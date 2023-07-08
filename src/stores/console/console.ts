/**
 * ConsoleStore
 */
export const useConsoleLayoutStore = defineStore('consoleLayout', () => {
  /**
   * State
   */

  const isModalVisible = ref(false);
  const isSlideoverVisible = ref(false);

  const modalComponent = ref('');
  const slideoverComponent = ref('');

  /**
   * Getters
   */

  /**
   * Actions
   */

  const showModal = (name: string) => {
    isModalVisible.value = true;
    modalComponent.value = name;
  };

  const showSideover = (name: string) => {
    isSlideoverVisible.value = true;
    slideoverComponent.value = name;
  };

  /**
   * 返回值
   */
  return {
    isModalVisible,
    isSlideoverVisible,
    showModal,
    showSideover,
    modalComponent,
    slideoverComponent,
  };
});
