import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import RabitPageSimpleSidebarContent from './RabitPageSimpleSidebarContent';

const RabitPageSimpleSidebar = forwardRef((props, ref) => {
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
            root: clsx('RabitPageSimple-sidebarWrapper', variant),
            paper: clsx(
              'RabitPageSimple-sidebar',
              variant,
              position === 'left' ? 'RabitPageSimple-leftSidebar' : 'RabitPageSimple-rightSidebar'
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
              root: 'RabitPageSimple-backdrop',
            },
          }}
          style={{ position: 'absolute' }}
        >
          <RabitPageSimpleSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>

      {variant === 'permanent' && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              'RabitPageSimple-sidebarWrapper',
              variant,
              isOpen ? 'opened' : 'closed',
              position === 'left' ? 'RabitPageSimple-leftSidebar' : 'RabitPageSimple-rightSidebar'
            )}
            open={isOpen}
            onClose={props?.onClose}
            classes={{
              paper: clsx('RabitPageSimple-sidebar border-0', variant),
            }}
          >
            <RabitPageSimpleSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});

RabitPageSimpleSidebar.defaultProps = {
  open: true,
};

export default RabitPageSimpleSidebar;
