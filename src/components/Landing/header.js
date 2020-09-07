import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Button, Popover } from 'antd'
import { ShoppingCartOutlined, SearchOutlined, FacebookOutlined, InstagramOutlined, QuestionOutlined, BellOutlined, AudioOutlined } from '@ant-design/icons'
import '../../asset/css/header.css'
import logo from '../../asset/images/logo.png'
import { Link } from 'react-router-dom'
import { auth, database } from 'firebase'
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#f53d2d',
    }}
  />
);

const Header = () => {
  const [user, setUser] = useState(null);
  const [userDB, setUserDB] = useState({});
  const [cart, setCart] = useState(0);
  const [cartDB, setCartDB] = useState();

  const Logout = () => {
    auth.signOut()
      .then((res) => {
        alert('User logout successfully!', res)
        window.location = '/'
      })
      .catch(err => console.log("signOut err", err)
      )
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      let userID = user.uid
      var rootRef = database.ref('users/' + userID);
      rootRef.once('value')
        .then((snapshot) => {
          var data = (snapshot.val() || 'null');
          setUserDB(data);
        })

      let ref = database.ref('cart_Item/');
      ref.on('value', snapshot => {
        var state = snapshot.val();
        if (state) {
          const objectList = Object.keys(state).map(key => ({
            ...state[key],
            id: key
          }));
          const count = snapshot.numChildren();
          setCart(count)

          setCartDB(objectList)
        }
      });
    });
  }, []);

  const content = () => {
    if (cart && cartDB) {
      return <div className='productincart'>
        <h3>giỏ hàng bạn có {cart} sản phẩm</h3>
        {console.log(cartDB, 'cartDB')}
        {cartDB.map((cartItem, index) => (
          <div className='cartItem' key={cartItem.id}>
            <Row>
              <Col span={8}>
                <div className='cartImg'> <img src={cartItem.image} alt="cartImg" /></div>
              </Col>
              <Col span={7}>
                {cart.name}
              </Col>
              <Col span={6}>&#8363;{cartItem.price}.000</Col>
              <Col span={2}> <Button >xóa</Button></Col>
            </Row>
          </div>
        ))}
        <Link to='/cart-item/'><Button type='primary'>Xem Giỏ Hàng</Button></Link>
      </div>
    } else {
      return <div className='productincard'>
        <div className='imgcard'></div>
        <div><p>chưa có sản phẩm &#9785;</p></div>
      </div>
    }
  }

  const LogoutBtn = () => {
    return <div className='showaccount'>
      <img className="avatar" id='myImgId' src={userDB.avatarUser} alt="avatar" />
      <Link to="/user-detail">{userDB.userName}</Link>
      <Button type="link" onClick={Logout}> Đăng xuất </Button>
    </div>
  }

  const LoginBtn = () => {
    return <div className='btnsignin'>
      <Link to={ROUTES.SIGN_IN}><a href="#">Đăng Nhập</a></Link>
      <Link to={ROUTES.SIGN_UP}> <a href="#">Đăng Ký</a></Link>
    </div>
  }

  return (
    <div className='container'>
      <div className='header'>
        <div className='header1'>
          <Row>
            <Col span={12}>
              <div className='headerlist'>
                <a href="#">Kênh Người Bán </a>
                <a href="#">Tải Ứng Dụng </a>
                <a href="#">Kết Nối </a>
                <a href="#"><FacebookOutlined /></a>
                <a href="#"><InstagramOutlined /></a>
              </div>
            </Col>
            <Col span={12}>
              <div className='headerlist'>
                <a href="#"><BellOutlined />Thông Báo</a>
                <a href="#"><QuestionOutlined />Trợ Giúp</a>
                {user ? <div id='user'>{LogoutBtn()}</div> : <div id='user'>{LoginBtn()}</div>}
              </div>
            </Col>
          </Row>
        </div>
        <div className='header2'>
          <Row>
            <Col span={2}></Col>
            <Col span={3}><a href="/"><img src={logo} alt="logoheader" /></a></Col>
            <Col span={12} className='inputsearch'>
              <Search
                placeholder="Bạn cần tìm gì???"
                enterButton={<SearchOutlined />}
                size="large"
                suffix={suffix}
                onSearch={value => console.log(value)}
              />
            </Col>
            <Col span={3}>
              <Popover content={content}>
                <Link to='/cart-item/'><Button type='link' className='card'><ShoppingCartOutlined />{cart}</Button></Link>
              </Popover>
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Header;