import React from 'react';
import Router from 'next/router';

const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      if (!ctx.req) {
        // If the request is not from the server, check if the user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
          Router.push('/posts/login');
        }
      }
      // If the request is from the server, check if the user is logged in using the session
      // or a cookie
      // ...
      
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));
  
      return { ...componentProps };
    }
  
    componentDidMount() {
      const token = localStorage.getItem('token');
      if (!token) {
        Router.push('/posts/login');
      }
    }
  
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;

