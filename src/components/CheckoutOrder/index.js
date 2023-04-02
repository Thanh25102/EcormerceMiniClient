import { memo, useState } from 'react';
import classNames from 'classnames/bind';

import CheckoutOrderDetails from '../CheckoutOrderDetails';
import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './CheckoutOrder.module.scss';
import { getCartProducts } from '~/utils/localStorage';

const cx = classNames.bind(styles);

function CheckoutOrder({
  fristNameRef,
  lastNameRef,
  companyRef,
  regionRef,
  streetAddressRef,
  streetAddress2Ref,
  cityRef,
  countryRef,
  postCodeRef,
  phoneRef,
  emailRef,
  register,
}) {
  const [radioChecked, setRadioChecked] = useState(1);

  return (
    <div className={cx('your-order')}>
      <h2 className={cx('your-order-title')}>Your order</h2>
      <div className={cx('order-review')}>
        <CheckoutOrderDetails data={getCartProducts()} />
        <Button primary className={cx('place-order-btn')}>
          Place order
        </Button>
      </div>
    </div>
  );
}

export default memo(CheckoutOrder);
