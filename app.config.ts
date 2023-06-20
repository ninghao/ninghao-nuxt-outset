const card = {
  base: 'overflow-hidden font-light',
  background: 'bg-white dark:bg-gray-900',
  divide: 'divide-y divide-gray-200 dark:divide-gray-800',
  ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
  rounded: 'rounded-lg',
  shadow: 'shadow',
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

export default {
  ui: {
    card,
    formGroup,
  },
};
