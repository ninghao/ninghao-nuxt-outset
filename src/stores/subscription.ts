import { Region } from '~/schema/region';
import { Plan } from '~/schema/plan';
import {
  Subscriptions,
  createSubscriptionDtoSchema,
  subscriptionsSchema,
  _subscription,
  Subscription,
  subscriptionSchema,
} from '~/schema/subscription';
import { Payment } from '~/schema/payment';

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

  // 单个实体
  const entity = ref<Partial<Subscription>>({ ..._subscription });

  // 实体列表
  const entities = ref<Subscriptions>([]);

  // 实体总数
  const totalCount = ref(0);

  // 地址查询符
  const entitiesQuery = ref({
    page: 1,
    sort: '',
    filters: {
      subject: {
        $eq: '',
      },
    },
  });

  // 选择的订阅区域
  const region = ref<Region>();

  // 选择的订阅计划
  const plan = ref<Plan>();

  // 选择的支付方法
  const payment = ref<Payment>();

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

  const entitiesQueryString = computed(() => {
    return useEntitiesQueryString(entitiesQuery.value);
  });

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

  const setTotalCount = (data: number | string | null) => {
    if (data) {
      totalCount.value = parseInt(`${data}`, 10);
    }
  };

  const setRegion = (data: Region) => {
    region.value = data;
  };

  const setPlan = (data: Plan) => {
    plan.value = data;
  };

  const setPayment = (data: Payment) => {
    payment.value = data;
  };

  const setCurrentStep = (data: StepName) => {
    currentStep.value = data;
  };

  const setSubjectFilter = (data: string) => {
    entitiesQuery.value.filters.subject.$eq = data;
  };

  /**
   * 读取
   */
  const retrieve = async () => {
    // 获取实体列表
    const { data, error } = await useFetch(
      `/api/subscriptions?${entitiesQueryString.value}`,
      {
        ...useApiInterceptor(),
        onResponse(context) {
          setTotalCount(context.response.headers.get('x-total-count'));
        },
        transform: (data) => subscriptionsSchema.parse(data),
      },
    );

    if (error.value) return;

    if (data.value) {
      entities.value = data.value;
    }

    return data;
  };

  /**
   * 创建
   */
  const create = async () => {
    // 主体数据
    const body = createSubscriptionDtoSchema.parse(entity.value);

    // 请求接口
    const { data, error } = await useFetch('/api/subscriptions', {
      method: 'POST',
      body,
      ...useApiInterceptor(),
      transform: (data) => subscriptionSchema.parse(data),
    });

    // 处理错误
    if (error.value) return;

    // 重置状态
    // $reset();

    // 显示通知
    // useToast().add({ title: '成功创建了区域' });

    // 更新列表
    retrieve();

    // 返回数据
    return data;
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
    retrieve,
    create,
    entities,
    entity,
    setSubjectFilter,
    payment,
    setPayment,
  };
});
