import React, { useState, useEffect } from 'react'
import { Row, Col, Rate, Menu, Dropdown, Button, Input } from 'antd'
import { CarOutlined, DownOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import '../../asset/css/productDetail.css'
import { auth, database } from 'firebase'

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">101 - Đà Nẵng</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">Thành Phố Hồ Chí Minh</a>
    </Menu.Item>
  </Menu>
)

const ProductDetail = (props) => {

  const products = props.location.state;
  const { id } = props.match.params ? props.match.params : '';
  const [user, setUser] = useState(null);
  const [userDB, setUserDB] = useState({});
  const [count, setCount] = useState(1);


  useEffect(() => {
    document.title = `${count}`;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        let userID = user.uid
        var rootRef = database.ref('users/' + userID);
        rootRef.once('value')
          .then((snapshot) => {
            var data = (snapshot.val() || 'null');
            setUserDB(data);
          })
      }
    });
  }, []);

  const AddIterm = () => {
    if (user) {
      database.ref('cart_Item/').push({
        productsID: id,
        userID: userDB.userID,
        quantity: count,
        image: products.contact.image,
        name: products.contact.name,
        price: products.contact.price
      });
      alert('add sản phẩm vào giỏ hàng thành công!')
    } else {
      alert('You need to Signin if have account or SignUp ');
      window.location = '/singin-account'
    }
  }

  return (
    <div className='productdetail'>
      <Row>
        <Col span={3}></Col>
        <Col span={8}>
          <img src={products.contact.image} alt="productimg" className='productimg' />
        </Col>
        <Col span={9}>
          <div className='productdetail1'>
            <div className='nameproduct'><h2>{products.contact.name}</h2></div>
            <div className='check'>
              <Row>
                <Col span={2}></Col>
                <Col span={6}>
                  5<Rate value={5} />
                </Col>
                <Col span={6}>
                  <p>5 Đánh Gía</p>
                </Col>
                <Col span={6}>
                  <p>20 Đã Bán</p>
                </Col>
                <Col span={2}></Col>
              </Row>
            </div>
            <div className='priceproduct'>
              <h1>&#8363;{products.contact.price}.000</h1>
            </div>
            <div className='detail'>
              <div>
                <Row>
                  <Col span={6} className='detail1'>
                    <p>Vận Chuyển</p>
                  </Col>

                  <Col span={18} className='detail2'>
                    <div>
                      <div>
                        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9d21899f3344277e34d40bfc08f60bc7.png" alt="" />
                        Miễn Phí Vận Chuyển
                      </div>
                      <p> Miễn Phí Vận Chuyển khi đơn hàng đạt giá trị tối thiểu</p>
                    </div>
                    <div>
                      <Row>
                        <Col span={12}><CarOutlined /> Vận Chuyển Tới</Col>
                        <Col span={12}>
                          <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                              Đà Nẵng<DownOutlined />
                            </a>
                          </Dropdown>
                        </Col>
                      </Row>
                    </div></Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col span={6} className='detail1'>
                    <p>Màu Sắc</p>
                  </Col>
                  <Col span={18} className='detail2'>
                    <Button>{products.contact.color}</Button>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col span={6} className='detail1'>
                    <p> Size</p>
                  </Col>
                  <Col span={18} className='detail2'>
                    <Button>{products.contact.size}</Button>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col span={6} className='detail1'>
                    <p>Số Lượng</p>
                  </Col>
                  <Col span={18} className='detail2'>
                    <Button className='btnplus' onClick={() => setCount(count + 1)}>+</Button>
                    <Input style={{ width: '10%' }} value={count} />
                    <Button onClick={() => setCount(count > 1 ? count - 1 : count)}>-</Button>
                    {products.contact.quantity} hàng có sẵn
                  </Col>
                </Row>
              </div>
            </div>
            <div className='btnbuy'>
              <Row>
                <Col span={12}>
                  <Button danger onClick={() => AddIterm(products)} ><ShoppingCartOutlined />Thêm Vào Giỏ Hàng</Button>
                </Col>
                <Col span={12}>
                  <Button type='primary'>MUA NGAY</Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  )
}

export default ProductDetail;