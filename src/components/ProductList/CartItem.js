import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Input } from 'antd'
import '../../asset/css/cartItem.css'
import { database } from 'firebase'

const CartItem = () => {

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);    // setcount  lấy lại tại bảng cartItem 

  useEffect(() => {
    document.title = `${count}`;
    let ref = database.ref('cart_Item/');
    ref.on('value', snapshot => {
      var state = snapshot.val();
      if (state) {
        const objectList = Object.keys(state).map(key => ({
          ...state[key],
          id: key
        }));
        console.log(objectList, 'objectList');
        setProducts(objectList)
      }
    });

  }, []);

  return (
    <div className='CartCheckout'>
      <h2>Giỏ Hàng Của Bạn</h2>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          {products.map((cart, index) => (
            <div className='cartItem' >
              <Row>
                <Col span={8}>
                  <div className='cartImg'> <img src={cart.image} alt="cartImg" /></div>
                </Col>
                <Col span={5}>
                  {cart.name}
                </Col>
                <Col span={2}>&#8363;{cart.price}.000</Col>
                <Col span={6} >
                  <Button className='btnplus' onClick={() => setCount(count + 1)}>+</Button>
                  <Input style={{ width: '10%' }} value={count} />
                  <Button onClick={() => setCount(count > 1 ? count - 1 : count)}>-</Button>
                </Col>
                <Col span={2}> <Button >xóa</Button></Col>
              </Row>
            </div>
          ))}
          <Button type='primary'>Mua hàng</Button>
          <p></p>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  )
}

export default CartItem;