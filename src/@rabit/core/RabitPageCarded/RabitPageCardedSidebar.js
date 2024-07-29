import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import RabitPageCardedSidebarContent from './RabitPageCardedSidebarContent';

const RabitPageCardedSidebar = forwardRef((props, ref) => {
  const { open, position, variant, rootRef, sidebarWidth } = props;

  const [isOpen, setIsOpen] = useState(open);

  useImperativeHandle(ref, () => ({
    toggleSidebar: handleToggleDrawer,
  }));

  const handleToggleDrawer = useCallback((val) => {
    setIsOpen(val);
  }, []);

  useEffect(() => {
    handleToggleDrawer(open);
  }, [handleToggleDrawer, open]);

  return (
    <>
      <Hidden lgUp={variant === 'permanent'}>
        <SwipeableDrawer
          variant="temporary"
          anchor={position}
          open={isOpen}
          onOpen={(ev) => {}}
          onClose={() => props?.onClose()}
          disableSwipeToOpen
          classes={{
            root: clsx('RabitPageCarded-sidebarWrapper', variant),
            paper: clsx(
              'RabitPageCarded-sidebar',
              variant,
              position === 'left' ? 'RabitPageCarded-leftSidebar' : 'RabitPageCarded-rightSidebar'
            ),
          }}
          sx={{
            '& .MuiPaper-root': {
              width: sidebarWidth,
              maxWidth: '100%',
            },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // container={rootRef.current}
          BackdropProps={{
            classes: {
              root: 'RabitPageCarded-backdrop',
            },
          }}
          style={{ position: 'absolute' }}
        >
          <RabitPageCardedSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>
      {variant === 'permanent' && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              'RabitPageCarded-sidebarWrapper',
              variant,
              isOpen ? 'opened' : 'closed',
              position === 'left' ? 'RabitPageCarded-leftSidebar' : 'RabitPageCarded-rightSidebar'
            )}
            open={isOpen}
            onClose={props?.onClose}
            classes={{
              paper: clsx('RabitPageCarded-sidebar', variant),
            }}
          >
            <RabitPageCardedSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});

RabitPageCardedSidebar.defaultProps = {
  open: true,
};

export default RabitPageCardedSidebar;
