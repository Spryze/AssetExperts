import NavLinkAdapter from '@rabit/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import withRouter from '@rabit/core/withRouter';
import RabitNavBadge from '../../RabitNavBadge';
import RabitSvgIcon from '../../../RabitSvgIcon';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none!important',
  minHeight: 48,
  '&.active': {
    backgroundColor: `${theme.palette.secondary.main}!important`,
    color: `${theme.palette.secondary.contrastText}!important`,
    pointerEvents: 'none',
    '& .rabit-list-item-text-primary': {
      color: 'inherit',
    },
    '& .rabit-list-item-icon': {
      color: 'inherit',
    },
  },
  '& .rabit-list-item-icon': {},
  '& .rabit-list-item-text': {
    padding: '0 0 0 16px',
  },
}));

function RabitNavHorizontalItem(props) {
  const { item } = props;

  return useMemo(
    () => (
      <StyledListItem
        button
        component={NavLinkAdapter}
        to={item.url || ''}
        activeClassName={item.url ? 'active' : ''}
        className={clsx('rabit-list-item', item.active && 'active')}
        end={item.end}
        role="button"
        sx={item.sx}
        disabled={item.disabled}
      >
        {item.icon && (
          <RabitSvgIcon
            className={clsx('rabit-list-item-icon shrink-0', item.iconClass)}
            color="action"
          >
            {item.icon}
          </RabitSvgIcon>
        )}

        <ListItemText
          className="rabit-list-item-text"
          primary={item.title}
          classes={{ primary: 'text-13 rabit-list-item-text-primary truncate' }}
        />

        {item.badge && <RabitNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />}
      </StyledListItem>
    ),
    [item.badge, item.exact, item.icon, item.iconClass, item.title, item.url]
  );
}

RabitNavHorizontalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
  }),
};

RabitNavHorizontalItem.defaultProps = {};

const NavHorizontalItem = withRouter(memo(RabitNavHorizontalItem));

export default NavHorizontalItem;
