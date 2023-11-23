import { useSnackbar } from 'notistack';

export const useSnackbarUtils = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  return {
    showSnackbar,
  };
};