// import RabitUtils from '@rabit/utils';
// import AppContext from 'app/AppContext';
// import { Component } from 'react';
// import { matchRoutes } from 'react-router-dom';
// import withRouter from '@rabit/core/withRouter';
// import history from '@history';

// let loginRedirectUrl = null;

// class RabitAuthorization extends Component {
//   constructor(props, context) {
//     console.log(props)
    
//     super(props);
//     const { routes } = context;
//     this.state = {
//       accessGranted: true,
//       routes,
//     };
//     this.defaultLoginRedirectUrl = props.loginRedirectUrl || '/';
//   }

//   componentDidMount() {
    
//     if (!this.state.accessGranted) {
//       console.log(this.state.accessGranted)
//       this.redirectRoute();
//     }
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     return nextState.accessGranted !== this.state.accessGranted;
//   }

//   componentDidUpdate() {
//     if (!this.state.accessGranted) {
//       this.redirectRoute();
//     }
//   }

//   static getDerivedStateFromProps(props, state) {
//     console.log("props",props, "state",state)
//     const { location, userRole } = props;
//     const { pathname } = location;

//     const matchedRoutes = matchRoutes(state.routes, pathname);

//     const matched = matchedRoutes ? matchedRoutes[0] : false;
//     return {
//       accessGranted: matched ? RabitUtils.hasPermission(matched.route.auth, userRole) : true,
//     };
//   }

//   redirectRoute() {
//     const { location, userRole } = this.props;
//     const { pathname } = location;
//     const redirectUrl = loginRedirectUrl || this.defaultLoginRedirectUrl;
  
//     /*
//         User is guest
//         Redirect to Login Page
//         */
//     if (!userRole || userRole.length === 0) {
//       setTimeout(() => history.push('/sign-in'), 0);
//       loginRedirectUrl = pathname;
//     } else {
//       /*
//         User is member
//         User must be on unAuthorized page or just logged in
//         Redirect to dashboard or loginRedirectUrl
//         */
//       setTimeout(() => history.push(redirectUrl), 0);
//       loginRedirectUrl = this.defaultLoginRedirectUrl;
//       console.log("render")
//     }
//   }

//   render() {
//     console.info('Rabit Authorization rendered', this.state.accessGranted);
//     return this.state.accessGranted ? <>{this.props.children}</> : null;
    
//   }
// }

// RabitAuthorization.contextType = AppContext;

// export default withRouter(RabitAuthorization);

import React, { Component } from 'react';
import { matchRoutes } from 'react-router-dom';
import withRouter from '@rabit/core/withRouter';
import history from '@history';

class RabitAuthorization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessGranted: true,
    };
    this.defaultLoginRedirectUrl = '/';
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location } = props;
    const { pathname } = location;

    // Perform any route matching or authorization checks here if needed
    // For simplicity, we'll always grant access in this example
    const accessGranted = true;

    return { accessGranted };
  }

  redirectRoute() {
    const redirectUrl = this.defaultLoginRedirectUrl; // Homepage URL

    setTimeout(() => history.push(redirectUrl), 0);
  }

  render() {
    return this.state.accessGranted ? <>{this.props.children}</> : null;
  }
}

export default withRouter(RabitAuthorization);
