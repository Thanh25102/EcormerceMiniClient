import { memo, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import { getAccessToken } from '~/utils/localStorage';
import { priceFormat } from '~/utils/priceFormat';
import Button from '~/components/Button';
import * as OrderApi from '~/api/orderApi';
import styles from './OrderDetail.module.scss';

const cx = classNames.bind(styles);

function OrderDetail({ itemList, status, orderNumber, orderDate, orderId, allActiveStatusRef,quantity, ...passProps }) {
  let totalPrice = 0;
  const orderBoxRef = useRef();
  const statusChangeBtnRef = useRef();
  const statusTitleRef = useRef();

  console.log("list :",itemList);

  useEffect(() => {
    // console.log('call useEFFECT');
    orderBoxRef.current.style.display = 'block';
  }, [itemList]);


  return (
    <div ref={orderBoxRef} data-id={orderId} className={cx('order-box')}>
      <div className={cx('order-id-status')}>
        <div className={cx('order-id')}>
          <h3>ORDER NUMBER: </h3>
          <span> {orderNumber}</span>
        </div>
        {status && (
          <h2 ref={statusTitleRef} className={cx('order-status')}>
            {status.title}
          </h2>
        )}
      </div>
      <div className={cx('order-product-list')}>
        {itemList
          ? itemList.map((item) => {
              totalPrice += item.price * quantity;
              return (
                <div key={item.id} className={cx('order-product')}>
                  <div className={cx('product-item')}>
                    <div className={cx('product-imgBox')}>
                      <img className={cx('product_img')} src={require(`../../assets/images/${item.image}`)} alt="" />
                    </div>
                    <div className={cx('product-info')}>
                      <span className={cx('product-name')}>{item.name}</span>
                      <span className={cx('product-quantity')}>X{quantity}</span>
                      <span className={cx('product-price')}>${item.price}</span>
                    </div>
                  </div>
                  <span className={cx('product-total')}>${priceFormat(item.price * quantity)}</span>
                </div>
              );
            })
          : []}
      </div>
      <div className={cx('order-footer')}>

        <div className={cx('order-totalBox')}>
          <div className={cx('order-footer-total')}>
            Total:
            <span> ${priceFormat(totalPrice)}</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default memo(OrderDetail);
