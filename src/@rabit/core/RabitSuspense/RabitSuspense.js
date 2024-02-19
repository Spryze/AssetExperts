import RabitLoading from '@rabit/core/RabitLoading';
import PropTypes from 'prop-types';
import { Suspense } from 'react';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */ function RabitSuspense(props) {
  return <Suspense fallback={<RabitLoading {...props.loadingProps} />}>{props.children}</Suspense>;
}

RabitSuspense.propTypes = {
  loadingProps: PropTypes.object,
};

RabitSuspense.defaultProps = {
  loadingProps: {
    delay: 0,
  },
};

export default RabitSuspense;
