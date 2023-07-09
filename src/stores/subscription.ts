import { Region } from '~/schema/region';
import { Plan } from '~/schema/plan';

type StepName = 'selectRegion' | 'selectPlan' | 'pay';

type Step = {
  title: string;
  name: StepName;
};

/**
 * SubscriptionStore
 */
export const useSubscriptionStore = defineStore('subscription', () => {
  /**
   * State 🌴
   */

  // 选择的订阅区域
  const region = ref<Region>();

  // 选择的订阅计划
  const plan = ref<Plan>();

  // 订阅步骤
  const steps = ref<Array<Step>>([
    {
      title: '选择区域',
      name: 'selectRegion',
    },
    {
      title: '选择时长',
      name: 'selectPlan',
    },
    {
      title: '确定支付',
      name: 'pay',
    },
  ]);

  // 当前步骤
  const currentStep = ref<StepName>('selectRegion');

  /**
   * Getters 🌵
   */

  const isStepActive = computed(() => (stepName: StepName) => {
    if (stepName === currentStep.value) {
      return true;
    }

    return false;
  });

  const isSelectedRegion = computed(() => (data: Region) => {
    return data.id !== region.value?.id;
  });

  const isSelectedPlan = computed(() => (data: Plan) => {
    return data.id == plan.value?.id;
  });

  /**
   * Actions 🚀
   */

  const setRegion = (data: Region) => {
    region.value = data;
  };

  const setPlan = (data: Plan) => {
    plan.value = data;
  };

  const setCurrentStep = (data: StepName) => {
    currentStep.value = data;
  };

  /**
   * 返回值
   */
  return {
    region,
    plan,
    steps,
    currentStep,
    setCurrentStep,
    isStepActive,
    isSelectedPlan,
    isSelectedRegion,
    setRegion,
    setPlan,
  };
});
