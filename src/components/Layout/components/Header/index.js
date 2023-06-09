import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faFileInvoiceDollar, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import { useAuthenContext } from '~/customHook';
import * as authenApi from '~/api/authenApi';
import { getAccessToken } from '~/utils/localStorage';
import Image from '~/components/Image';
import image from '~/assets/images';
import config from '~/config';

const cx = classNames.bind(styles);

function Header() {
  const [, authenDispatch] = useAuthenContext();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const handleLogout = () => {
    authenApi.logout(accessToken, authenDispatch, navigate);
  };

  const MENU_ITEMS = accessToken
    ? [
        {
          icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
          title: 'Purchase',
          to: `/user/purchase`,
        },
        {
          icon: <FontAwesomeIcon icon={faRightToBracket} />,
          title: 'Logout',
          onClick: handleLogout,
          separate: true,
        },
      ]
    : [
        {
          icon: <FontAwesomeIcon icon={faRightToBracket} />,
          title: 'Login',
          to: `/login`,
        },
        {
          icon: <FontAwesomeIcon icon={faRightToBracket} />,
          title: 'Register',
          to: `/register`,
        },
      ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('nav_container')}>
          <div className={cx('logo')}>
            <Link to="/">
              <img src={image.logo} alt="Burger-shop" />
              <span>CT-FOOD</span>
            </Link>
          </div>
        </div>

        <div className={cx('nav_actions')}>
          <Menu items={MENU_ITEMS} menuItemClass={cx('menu_item')}>
            {accessToken ? (
              <Image className={cx('user-avatar')} src={require('~/assets/images/avatardefault.png')} alt="avatar" />
            ) : (
              <div className={cx('nav_user')}>
                <div className={cx('user_icon')}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
            )}
          </Menu>
          <Link to={config.routes.cart} className={cx('nav_cart')}>
            {/* <Link to="/cart"> */}
            <FontAwesomeIcon className={cx('cart_icon')} icon={faCartShopping} />
            <span className={cx('cart_product_numbers')}></span>
            {/* </Link> */}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
