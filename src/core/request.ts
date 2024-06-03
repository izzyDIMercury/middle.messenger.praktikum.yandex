export default class HTTPTransport {

    static readonly GET = "GET";
    static readonly POST = "POST";
    static readonly PUT = "PUT";
    static readonly DELETE = "DELETE";

    constructor(props) {
        console.log(props);
    }

    public get(url, options = {}) { 
        return this.request(url, {...options, method: HTTPTransport.GET}, options.timeout);
    };
    
    public post(url, options = {}) {
      return this.request(url, {...options, method: HTTPTransport.POST}, options.timeout);
    };
    
    public put(url, options = {}) {
      return this.request(url, {...options, method: HTTPTransport.PUT}, options.timeout);
    };
    
    public delete(url, options = {}) { 
      return this.request(url, {...options, method: HTTPTransport.DELETE}, options.timeout);
    };
    
    public request(url, options = {}, timeout = 3000) {
        const {headers = {}, method, data} = options;
      
        return new Promise(function(resolve, reject) {
          if (!method) {
            reject('No method');
            return;
          }
      
          const xhr = new XMLHttpRequest();
          const isGet = method === METHODS.GET;
      
          xhr.open(
            method, 
            isGet && !!data
            ? `${url}${queryStringify(data)}`
            : url,
          );
      
          Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key]);
          });
      
          xhr.onload = function() {
            resolve(xhr);
          };
      
          xhr.onabort = reject;
          xhr.onerror = reject;
      
          xhr.timeout = timeout;
          xhr.ontimeout = reject;
      
          if (isGet || !data) {
            xhr.send();
          } else {
            xhr.send(data);
          }
        });
    };
}
















// function fetchWithRetry(url, options = {}) {
//     const {tries = 1} = options;
  
//       function onError(err){
//           const triesLeft = tries - 1;
//           if (!triesLeft){
//               throw err;
//           }
  
//           return fetchWithRetry(url, {...options, tries: triesLeft});
//       }
  
//       return fetch(url, options).catch(onError);
//   }
//   const METHODS = {
//     GET: 'GET',
//     POST: 'POST',
//     PUT: 'PUT',
//     DELETE: 'DELETE',
//   };
  
//   // Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
//   // Необязательный метод
//   function queryStringify(data) {
//     if (typeof data !== 'object') {
//       throw new Error('Data must be object');
//     }
  
//     // Здесь достаточно и [object Object] для объекта
//     const keys = Object.keys(data);
//     return keys.reduce((result, key, index) => {
//       return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
//     }, '?');
//   }
  
//   class HTTPTransport {
//     get = (url, options = {}) => {
  
//       return this.request(url, {...options, method: METHODS.GET}, options.timeout);
//     };
  
//   post = (url, options = {}) => {
//     return this.request(url, {...options, method: METHODS.POST}, options.timeout);
//   };
  
//   put = (url, options = {}) => {
//     return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
//   };
  
//   delete = (url, options = {}) => { 
//     return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
//   };
  
//   request = (url, options = {}, timeout = 5000) => {
//     const {headers = {}, method, data} = options;
  
//     return new Promise(function(resolve, reject) {
//       if (!method) {
//         reject('No method');
//         return;
//       }
  
//       const xhr = new XMLHttpRequest();
//       const isGet = method === METHODS.GET;
  
//       xhr.open(
//         method, 
//         isGet && !!data
//         ? `${url}${queryStringify(data)}`
//         : url,
//       );
  
//       Object.keys(headers).forEach(key => {
//         xhr.setRequestHeader(key, headers[key]);
//       });
  
//       xhr.onload = function() {
//         resolve(xhr);
//       };
  
//       xhr.onabort = reject;
//       xhr.onerror = reject;
  
//       xhr.timeout = timeout;
//       xhr.ontimeout = reject;
  
//       if (isGet || !data) {
//         xhr.send();
//       } else {
//         xhr.send(data);
//       }
//     });
//   };
//   }
