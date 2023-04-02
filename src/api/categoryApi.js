import request from '~/utils/request';

export const getCategories = async () => {
  try {
    const res = await request.get('/categories');
    const result = res._embedded.categories;
    const newResult =  result.map(category => ({ title: category.name, ...category }));
    console.log(newResult);
    return newResult;
  } catch (err) {
  }
};
