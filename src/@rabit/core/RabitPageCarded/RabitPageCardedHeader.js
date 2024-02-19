import clsx from 'clsx';

function RabitPageCardedHeader(props) {
  return (
    <div className={clsx('RabitPageCarded-header', 'container')}>{props.header && props.header}</div>
  );
}

export default RabitPageCardedHeader;
