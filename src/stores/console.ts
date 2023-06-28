/**
 * ConsoleStore
 */
export const useConsoleStore = defineStore('console', () => {
  /**
   * State
   */

  const isModalVisible = ref(false);
  const isSideoverVisible = ref(false);

  const modalComponent = ref('BrandCreate');
  const sideoverComponent = ref('');

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

  const showSideover = () => {
    isSideoverVisible.value = true;
  };

  /**
   * 返回值
   */
  return {
    isModalVisible,
    isSideoverVisible,
    showModal,
    showSideover,
    modalComponent,
    sideoverComponent,
  };
});
