import { memo } from 'react';

import NotificationPanel from '../../shared-components/notificationPanel/NotificationPanel';

function RightSideLayout1(props) {
  return (
    <>
      <NotificationPanel />
    </>
  );
}

export default memo(RightSideLayout1);
