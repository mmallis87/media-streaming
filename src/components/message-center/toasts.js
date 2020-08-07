import { message } from 'antd';
import { CHANNEL_UNAVAILABLE_MESSAGE, TOAST_ID } from '../../util/consts';

const showLoadingToast = (content) =>
  message.loading({ key: TOAST_ID, content }, 0);

const showErrorToast = (content) =>
  message.error(
    {
      key: TOAST_ID,
      content,
    },
    3,
  );

const showUnavailableErrorToast = () =>
  showErrorToast(CHANNEL_UNAVAILABLE_MESSAGE);

export { showErrorToast, showLoadingToast, showUnavailableErrorToast };
