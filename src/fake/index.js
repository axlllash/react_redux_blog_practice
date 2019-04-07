const fakeFetchForLogin = (url, options) => {
  console.dir(options);

  return Promise.resolve({
    ok:true,
    json: () => (Promise.resolve({ code: 1, userName: 'weiyu' ,userData:{email:'123'}}))
  });
};

export { fakeFetchForLogin };