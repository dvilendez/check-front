export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/',
  webapiurl: (window as any)["envconfig"]["apiurl"] || "default"
};
