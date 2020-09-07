import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import '../../asset/css/productList.css'
import { database } from 'firebase';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let ref = database.ref('productVd/');
        ref.on('value', snapshot => {
            var state = snapshot.val();
            if (state) {
                const objectList = Object.keys(state).map(key => ({
                    ...state[key],
                    id: key
                }));
                setProducts(objectList)
            }
        });
    
  }, []);

  return (
    <div className='content'>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <div className='flex-container'>
            {products.map((contact, index) => (
              <div className='showProduct' key={contact.id}>
                <Link to={{ pathname: `/product-detail/${contact.id}`, state: {contact} }}>
                  <img src={contact.image} alt="img product" />
                  <div className='productInfor'>
                    <strong>{contact.name} &#10084;</strong>
                    <Row>
                      <Col span={12} className='price'>
                        <p>&#8363;{contact.price}.000 </p>
                      </Col>
                      <Col span={12} className='buyed'>
                        Đã bán 6
                  </Col>
                    </Row>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  )
}

export default ProductList;