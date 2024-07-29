import _ from '@lodash';
import RabitUtils from '@rabit/utils';

function NotificationModel(data) {
  data = data || {};

  return _.defaults(data, {
    id: RabitUtils.generateGUID(),
    icon: 'heroicons-solid:star',
    title: '',
    description: '',
    time: new Date().toISOString(),
    read: false,
    variant: 'default',
  });
}

export default NotificationModel;
