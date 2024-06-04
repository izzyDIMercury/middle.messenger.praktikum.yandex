// type UserData = Record<string, string>

export default class HTTPTransport {

    static readonly GET = "GET";
    static readonly POST = "POST";
    static readonly PUT = "PUT";
    static readonly DELETE = "DELETE";


    private stringify(userData) {
        if (typeof userData !== "object") {
          throw new Error("Data must be object!");
        }

        const keys = Object.keys(userData);
        return keys.reduce((result, key, index) => {
          return `${result}${key}=${userData[key]}${index < keys.length - 1 ? "&" : ""}`;
        }, '?');
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
        const self = this;
      
        return new Promise(function(resolve, reject) {
          if (!method) {
            reject("No method");
            return;
          }
      
          const xhr = new XMLHttpRequest();
          const isGet = method === self.GET;
      
          xhr.open(
            method, 
            isGet && !!data
            ? `${url}${self.stringify(data)}`
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
