import { Region } from '~/schema/region';
import { SubscriptionType } from '~/schema/subscription-type';

/**
 * SubscriptionStore
 */
export const useSubscriptionStore = defineStore('subscription', () => {
  /**
   * State 🌴
   */

  // 选择的区域
  const selectedRegion = ref<Region>();

  // 选择的订阅类型
  const selectedSubscriptionType = ref<SubscriptionType>();

  // 订阅步骤
  const steps = ref([
    {
      title: '选择区域',
      name: 'selectRegion',
    },
    {
      title: '选择时长',
      name: 'selectType',
    },
    {
      title: '确定支付',
      name: 'pay',
    },
  ]);

  const currentStep = ref('selectRegion');

  /**
   * Getters 🌵
   */

  /**
   * Actions 🚀
   */

  const setSelectedRegion = (data: Region) => {
    selectedRegion.value = data;
  };

  const setSelectedSubscriptionType = (data: SubscriptionType) => {
    selectedSubscriptionType.value = data;
  };

  const setCurrentStep = (data: string) => {
    console.log(data);

    currentStep.value = data;
  };

  /**
   * 返回值
   */
  return {
    selectedRegion,
    steps,
    setSelectedRegion,
    selectedSubscriptionType,
    setSelectedSubscriptionType,
    currentStep,
    setCurrentStep,
  };
});
