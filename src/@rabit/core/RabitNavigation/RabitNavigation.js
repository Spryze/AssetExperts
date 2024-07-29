import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { memo } from 'react';
import _ from '@lodash';
import GlobalStyles from '@mui/material/GlobalStyles';
import RabitNavHorizontalLayout1 from './horizontal/RabitNavHorizontalLayout1';
import RabitNavVerticalLayout1 from './vertical/RabitNavVerticalLayout1';
import RabitNavVerticalLayout2 from './vertical/RabitNavVerticalLayout2';
import RabitNavHorizontalCollapse from './horizontal/types/RabitNavHorizontalCollapse';
import RabitNavHorizontalGroup from './horizontal/types/RabitNavHorizontalGroup';
import RabitNavHorizontalItem from './horizontal/types/RabitNavHorizontalItem';
import RabitNavHorizontalLink from './horizontal/types/RabitNavHorizontalLink';
import RabitNavVerticalCollapse from './vertical/types/RabitNavVerticalCollapse';
import RabitNavVerticalGroup from './vertical/types/RabitNavVerticalGroup';
import RabitNavVerticalItem from './vertical/types/RabitNavVerticalItem';
import RabitNavVerticalLink from './vertical/types/RabitNavVerticalLink';
import { registerComponent } from './RabitNavItem';

const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '.popper-navigation-list': {
        '& .rabit-list-item': {
          padding: '8px 12px 8px 12px',
          height: 40,
          minHeight: 40,
          '& .rabit-list-item-text': {
            padding: '0 0 0 8px',
          },
        },
        '&.dense': {
          '& .rabit-list-item': {
            minHeight: 32,
            height: 32,
            '& .rabit-list-item-text': {
              padding: '0 0 0 8px',
            },
          },
        },
      },
    })}
  />
);

/*
Register Rabit Navigation Components
 */
registerComponent('vertical-group', RabitNavVerticalGroup);
registerComponent('vertical-collapse', RabitNavVerticalCollapse);
registerComponent('vertical-item', RabitNavVerticalItem);
registerComponent('vertical-link', RabitNavVerticalLink);
registerComponent('horizontal-group', RabitNavHorizontalGroup);
registerComponent('horizontal-collapse', RabitNavHorizontalCollapse);
registerComponent('horizontal-item', RabitNavHorizontalItem);
registerComponent('horizontal-link', RabitNavHorizontalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

function RabitNavigation(props) {
  const options = _.pick(props, [
    'navigation',
    'layout',
    'active',
    'dense',
    'className',
    'onItemClick',
    'firstLevel',
    'selectedId',
  ]);
  if (props.navigation.length > 0) {
    return (
      <>
        {inputGlobalStyles}
        {props.layout === 'horizontal' && <RabitNavHorizontalLayout1 {...options} />}
        {props.layout === 'vertical' && <RabitNavVerticalLayout1 {...options} />}
        {props.layout === 'vertical-2' && <RabitNavVerticalLayout2 {...options} />}
        
      </>
    );
  }
  return null;
}

RabitNavigation.propTypes = {
  navigation: PropTypes.array.isRequired,
};

RabitNavigation.defaultProps = {
  layout: 'vertical',
};

export default memo(RabitNavigation);
