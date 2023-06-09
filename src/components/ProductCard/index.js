import { memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import { addNotification } from '~/reducers/actions/toastAction';
import { getAccessToken } from '~/utils/localStorage';
import * as cartApi from '~/api/cartApi';
import Image from '~/components/Image';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ data, toastDispatch, className }) {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  console.log('re-render product');
  let handleAddToCart = (productId) => {
    console.log('Add to cart');
    console.log(productId);
    if (!accessToken) {
      navigate('/login');
      return;
    }

    const product = {
      productId,
      amount: 1,
    };
    cartApi.addToCart(accessToken, product, navigate);

    toastDispatch(
      addNotification({
        id: uuidv4(),
        type: 'SUCCESS',
        title: 'Successfuly add to cart',
        message: 'Successfully received cart product',
      }),
    );
  };
  console.log('concec : ', data?.image);
  return (
    <div className={cx('product-card', className)}>
      <Link to={`/detail/${data.id}`}>
        <div className={cx('product-img')}>
          {/* <img /> */}
          <Image src={require(`../../assets/images/${data?.image || 'avatardefault.png'}`)} alt="" />
        </div>
      </Link>
      <div className={cx('product-information')}>
        <div className={cx('product-name')}>
          <h3 className={cx('name')}>{data.title}</h3>
        </div>
        <div className={cx('product-description')}>
          <p className={cx('description')}>Lorem Ipsum is simply dummy text of the printing.</p>
        </div>
        <div className={cx('product-price')}>
          <p className={cx('price')}>${data.price}</p>
        </div>
        <div className={cx('addToCart-btn')}>
          <button className={cx('addToCart')} data-id={data.id} onClick={() => handleAddToCart(data.id)}>
            <div className={cx('addToCart-title')}>
              <FontAwesomeIcon className={cx('cart-plus_icon')} icon={faCartPlus} />
              <p className={cx('addToCart-text')}>Add to cart</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
