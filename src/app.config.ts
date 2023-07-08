const button = {
  base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0',
  font: 'font-normal',
  rounded: 'rounded-md',
  size: {
    '2xs': 'text-xs',
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base',
  },
  gap: {
    '2xs': 'gap-x-1',
    xs: 'gap-x-1.5',
    sm: 'gap-x-1.5',
    md: 'gap-x-2',
    lg: 'gap-x-2.5',
    xl: 'gap-x-2.5',
  },
  padding: {
    '2xs': 'px-2 py-1',
    xs: 'px-2.5 py-1.5',
    sm: 'px-2.5 py-1.5',
    md: 'px-3 py-2',
    lg: 'px-3.5 py-2.5',
    xl: 'px-3.5 py-2.5',
  },
  square: {
    '2xs': 'p-1',
    xs: 'p-1.5',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
    xl: 'p-2.5',
  },
  color: {
    white: {
      solid:
        'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      ghost:
        'text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
    },
    gray: {
      solid:
        'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      ghost:
        'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      link: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
    },
    black: {
      solid:
        'shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      link: 'text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
    },
  },
  variant: {
    solid:
      'shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400',
    outline:
      'ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
    soft: 'text-{color}-500 dark:text-{color}-400 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
    ghost:
      'text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
    link: 'text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 dark:text-{color}-400 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
  },
  icon: {
    base: 'flex-shrink-0',
    size: {
      '2xs': 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
  default: {
    size: 'sm',
    variant: 'solid',
    color: 'primary',
    loadingIcon: 'i-heroicons-arrow-path-20-solid',
  },
};

const card = {
  base: 'overflow-hidden font-light',
  background: 'bg-white dark:bg-gray-900',
  divide: 'divide-y divide-gray-200 dark:divide-gray-800',
  ring: 'ring-1 ring-gray-100 dark:ring-gray-800',
  rounded: 'rounded-lg',
  shadow: '',
  body: {
    base: '',
    background: '',
    padding: 'px-4 py-5 sm:p-6',
  },
  header: {
    base: '',
    background: '',
    padding: 'px-4 py-5 sm:px-6',
  },
  footer: {
    base: '',
    background: '',
    padding: 'px-4 py-4 sm:px-6',
  },
};

const formGroup = {
  wrapper: 'font-light',
  label: {
    wrapper: 'flex content-center justify-between',
    base: 'block text-sm font-light text-gray-700 dark:text-gray-200',
    required: `after:content-['*'] after:ml-0.5 after:text-red-500 dark:after:text-red-400`,
  },
  description: 'text-sm text-gray-500 dark:text-gray-400',
  container: 'mt-1 relative',
  hint: 'text-sm text-gray-500 dark:text-gray-400',
  help: 'mt-2 text-sm text-gray-500 dark:text-gray-400',
  error: 'mt-2 text-sm text-red-500 dark:text-red-400',
};

const select = {
  default: {
    size: 'lg',
    color: 'white',
    variant: 'none',
    loadingIcon: 'i-heroicons-arrow-path-20-solid',
    trailingIcon: 'i-heroicons-chevron-down-20-solid',
  },
};

const pagination = {
  wrapper: 'flex items-center -space-x-px',
  base: '',
  rounded: 'first:rounded-s-md last:rounded-e-md',
  default: {
    size: 'sm',
    activeButton: {
      color: 'primary',
      variant: 'soft',
    },
    inactiveButton: {
      color: 'white',
      variant: 'soft',
    },
    prevButton: {
      color: 'white',
      class: 'rtl:[&_span:first-child]:rotate-180',
      icon: 'i-heroicons-chevron-left-20-solid',
      variant: 'soft',
    },
    nextButton: {
      color: 'white',
      class: 'rtl:[&_span:last-child]:rotate-180',
      icon: 'i-heroicons-chevron-right-20-solid ',
      variant: 'soft',
    },
  },
};

export default {
  ui: {
    card,
    formGroup,
    select,
    pagination,
    button,
  },
};
