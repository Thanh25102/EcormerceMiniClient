import { useEffect, useState, useRef, useCallback } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

import styles from './UserOrders.module.scss';
import Button from '~/components/Button';
import OrderDetail from '~/components/OrderDetail';
import { getAccessToken } from '~/utils/localStorage';
import { dayFormat } from '~/utils/dateFormat';
import * as OrderApi from '~/api/orderApi';

const cx = classNames.bind(styles);

function UserOrders() {
  const [orderStatus, setOrderStatus] = useState(0);
  const [orders, setOrders] = useState([]);
  const allActiveStatusRef = useRef();
  // console.log('re render userOrders');

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await OrderApi.getOrders(getAccessToken(), orderStatus);
      setOrders(orders);
    };
    fetchOrders();
  }, [orderStatus]);
  const onStatusChangeUpdate = useCallback(
    (id) => {
      setOrders(orders.filter((order) => order.id !== id));
    },
    [orders],
  );

  return (
    <div className={cx('user-orders')}>
      <div className={cx('order-status')}>
      </div>
      <div className={cx('orders')}>
        {orders.length !== 0 ? (
          orders.map((order) => {
            return (
              <OrderDetail
                key={order.id}
                orderNumber={order.phone}
                orderId={order.id}
                status={order.status}
                quantity={order.quantity}
                itemList={order.products}
                allActiveStatusRef={allActiveStatusRef}
                onStatusChangeUpdate={onStatusChangeUpdate}
                orderDate={dayFormat(order.createdAt)}
              />
            );
          })
        ) : (
          <div className={cx('orders-empty')}>
            <FontAwesomeIcon className={cx('orders-empty-icon')} icon={faFileInvoiceDollar} />
            <h3 className={cx('orders-empty-title')}>There is no order yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrders;
