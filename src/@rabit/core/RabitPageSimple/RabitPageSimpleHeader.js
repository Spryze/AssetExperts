import clsx from 'clsx';

function RabitPageSimpleHeader(props) {
  return (
    <div className={clsx('RabitPageSimple-header', props.className)}>
      <div className="container">{props.header && props.header}</div>
    </div>
  );
}

export default RabitPageSimpleHeader;
