import request from '~/utils/request';

export const getProducts = async (filterState) => {
  try {
    const params = {
      page: filterState?.page,
      limit: filterState?.limit,
      price: filterState.price ? filterState.price.join(',') : '',
      sort: filterState?.sort,
      order: filterState?.order,
      categoryIdList: filterState.categoryIdList ? filterState.categoryIdList.join(',') : '',
    };
    const result = await request.get(`/products`, { params });
    return {
      products: result._embedded ? result._embedded.products : [],
      limit: result.page.size + '',
      page: result.page.number,
      total: result.page.totalElements,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (id) => {
  try {
    const result = await request.get(`/products/${id}`);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getRandomProducts = async (number) => {
  try {
    const result = await request.get(`/products/random?number=${number}`);
    /**
     * 
  "priceMin": "0",
  "priceMax": "30"
  "error": false,
  "total": 39,
  "page": 1,
  "limit": 6,
     */
    return result._embedded.products;
  } catch (err) {
    console.log(err);
  }
};
