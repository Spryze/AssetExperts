import RabitSvgIcon from '@rabit/core/RabitSvgIcon';

const NotificationIcon = ({ value }) => {
  switch (value) {
    case 'error': {
      return (
        <RabitSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:minus-circle
        </RabitSvgIcon>
      );
    }
    case 'success': {
      return (
        <RabitSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:check-circle
        </RabitSvgIcon>
      );
    }
    case 'warning': {
      return (
        <RabitSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:exclamation-circle
        </RabitSvgIcon>
      );
    }
    case 'info': {
      return (
        <RabitSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:information-circle
        </RabitSvgIcon>
      );
    }
    default: {
      return null;
    }
  }
};

export default NotificationIcon;
