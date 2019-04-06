export const fakeFetchForLogin(url,options){
  console.dir(options);

  return new Promise.resolve({
    json:new Promise.resolve(JSON.stringify({code:1,userName:'weiyu'}))
  });
}