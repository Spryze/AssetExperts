import RabitScrollbars from '@rabit/core/RabitScrollbars';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { memo, useState } from 'react';
import RabitSvgIcon from '../RabitSvgIcon';

const Root = styled('div')(({ theme }) => ({
  '& .RabitSidePanel-paper': {
    display: 'flex',
    width: 56,
    transition: theme.transitions.create(['transform', 'width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    paddingBottom: 64,
    height: '100%',
    maxHeight: '100vh',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    '&.left': {
      '& .RabitSidePanel-buttonWrapper': {
        left: 0,
        right: 'auto',
      },
      '& .RabitSidePanel-buttonIcon': {
        transform: 'rotate(0deg)',
      },
    },
    '&.right': {
      '& .RabitSidePanel-buttonWrapper': {
        right: 0,
        left: 'auto',
      },
      '& .RabitSidePanel-buttonIcon': {
        transform: 'rotate(-180deg)',
      },
    },
    '&.closed': {
      [theme.breakpoints.up('lg')]: {
        width: 0,
      },
      '&.left': {
        '& .RabitSidePanel-buttonWrapper': {
          justifyContent: 'start',
        },
        '& .RabitSidePanel-button': {
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          paddingLeft: 4,
        },
        '& .RabitSidePanel-buttonIcon': {
          transform: 'rotate(-180deg)',
        },
      },
      '&.right': {
        '& .RabitSidePanel-buttonWrapper': {
          justifyContent: 'flex-end',
        },
        '& .RabitSidePanel-button': {
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          paddingRight: 4,
        },
        '& .RabitSidePanel-buttonIcon': {
          transform: 'rotate(0deg)',
        },
      },
      '& .RabitSidePanel-buttonWrapper': {
        width: 'auto',
      },
      '& .RabitSidePanel-button': {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 38,
        transition: theme.transitions.create(
          ['background-color', 'border-radius', 'width', 'min-width', 'padding'],
          {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }
        ),
        width: 24,
        '&:hover': {
          width: 52,
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
      '& .RabitSidePanel-content': {
        opacity: 0,
      },
    },
  },

  '& .RabitSidePanel-content': {
    overflow: 'hidden',
    opacity: 1,
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  },

  '& .RabitSidePanel-buttonWrapper': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    width: '100%',
    minWidth: 56,
  },

  '& .RabitSidePanel-button': {
    padding: 8,
    width: 40,
    height: 40,
  },

  '& .RabitSidePanel-buttonIcon': {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  },

  '& .RabitSidePanel-mobileButton': {
    height: 40,
    position: 'absolute',
    zIndex: 99,
    bottom: 12,
    width: 24,
    borderRadius: 38,
    padding: 8,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(
      ['background-color', 'border-radius', 'width', 'min-width', 'padding'],
      {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }
    ),
    '&:hover': {
      width: 52,
      paddingLeft: 8,
      paddingRight: 8,
    },
    '&.left': {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      paddingLeft: 4,
      left: 0,
    },

    '&.right': {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      paddingRight: 4,
      right: 0,
      '& .RabitSidePanel-buttonIcon': {
        transform: 'rotate(-180deg)',
      },
    },
  },
}));

function RabitSidePanel(props) {
  const [opened, setOpened] = useState(props.opened);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleOpened() {
    setOpened(!opened);
  }

  function toggleMobileDrawer() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <Root>
      <Hidden lgDown>
        <Paper
          className={clsx(
            'RabitSidePanel-paper',
            props.className,
            opened ? 'opened' : 'closed',
            props.position,
            'shadow-lg'
          )}
          square
        >
          <RabitScrollbars className={clsx('content', 'RabitSidePanel-content')}>
            {props.children}
          </RabitScrollbars>

          <div className="RabitSidePanel-buttonWrapper">
            <Tooltip
              title="Toggle side panel"
              placement={props.position === 'left' ? 'right' : 'right'}
            >
              <IconButton
                className="RabitSidePanel-button"
                onClick={toggleOpened}
                disableRipple
                size="large"
              >
                <RabitSvgIcon className="RabitSidePanel-buttonIcon">
                  heroicons-outline:chevron-left
                </RabitSvgIcon>
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          classes={{
            paper: clsx('RabitSidePanel-paper', props.className),
          }}
          anchor={props.position}
          open={mobileOpen}
          onOpen={(ev) => {}}
          onClose={toggleMobileDrawer}
          disableSwipeToOpen
        >
          <RabitScrollbars className={clsx('content', 'RabitSidePanel-content')}>
            {props.children}
          </RabitScrollbars>
        </SwipeableDrawer>

        <Tooltip title="Hide side panel" placement={props.position === 'left' ? 'right' : 'right'}>
          <Fab
            className={clsx('RabitSidePanel-mobileButton', props.position)}
            onClick={toggleMobileDrawer}
            disableRipple
          >
            <RabitSvgIcon className="RabitSidePanel-buttonIcon">
              heroicons-outline:chevron-right
            </RabitSvgIcon>
          </Fab>
        </Tooltip>
      </Hidden>
    </Root>
  );
}

RabitSidePanel.propTypes = {};
RabitSidePanel.defaultProps = {
  position: 'left',
  opened: true,
};

export default memo(RabitSidePanel);
