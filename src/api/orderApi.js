import request from '~/utils/request';

export const addOrder = async (accessToken, orderInfor) => {
  try {
    const result = await request.post(`/order`, orderInfor, { headers: { token: `Bearer ${accessToken}` } });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (accessToken, status) => {
  try {
    const result = await request.get(`/orders/user`, { headers: { token: `Bearer ${accessToken}` } });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const updateOrderStatus = async (accessToken, orderStatusChangeInfor) => {
  try {
    const result = await request.post(`/order/update`, orderStatusChangeInfor, {
      headers: { token: `Bearer ${accessToken}` },
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
