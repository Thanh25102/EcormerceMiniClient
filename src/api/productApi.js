import request from '~/utils/request';

export const getProducts = async (filterState) => {
  try {
    const params = {
      page: filterState?.page,
      limit: filterState?.limit,
      search: filterState?.searchTitle,
      price: filterState.price ? filterState.price.join(',') : '',
      sort: filterState?.sort,
      order: filterState?.order,
      categoryIdList: filterState.categoryIdList ? filterState.categoryIdList.join(',') : '',
    };
    console.log(params);
    return request.get(`/products`, { params });
    // return params;
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (id) => {
  try {
    const result = await request.get(`/products/${id}`);
    return result;
    // return params;
  } catch (err) {
    console.log(err);
  }
};

export const getRandomProducts = async (number) => {
  try {
    const result = await request.get(`/products/random?number=${number}`);
    return result;
  } catch (err) {
    console.log(err);
  }
};
