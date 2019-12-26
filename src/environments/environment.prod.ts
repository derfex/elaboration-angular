const root = 'https://ssdev.superagent.ru/TestApp/';

export const environment = {
  production: true,
  API: {
    root,
    products: {
      getAll: root + 'Values/GetAll',
    },
  },
};
