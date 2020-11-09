exports.LOGIN_QUERY = JSON.stringify({
  query: `query { 
    viewer { 
      login  
    }
  }`,
  variables: {}
});