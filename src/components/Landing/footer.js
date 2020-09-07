import React from 'react'
import { Row, Col } from 'antd'
import '../../asset/css/footer.css'
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons'

const Footer = () => {
    return (
        <div className='footer'>
            <Row>
                <Col span={2}></Col>
                <Col span={4}>
                    <h4>CHĂM SÓC KHÁCH HÀNG</h4>
                    <ul>
                        <li><a href="#">Trung Tâm Trợ Giúp</a></li>
                        <li><a href="#">Shopee Blog</a></li>
                        <li><a href="#">Shopee Mail</a></li>
                        <li><a href="#">Hướng Dẫn Mua Hàng</a></li>
                        <li><a href="#">Hướng Dẫn Bán Hàng</a></li>
                        <li><a href="#">Thanh Toán</a></li>
                        <li><a href="#">Shopee Xu</a></li>
                    </ul>
                </Col>
                <Col span={4}>
                    <h4>VỀ SHOPEE</h4>
                    <ul>
                        <li><a href="#">Giới Thiệu Về Shopee Việt Nam</a></li>
                        <li><a href="#">Tuyển Dụng</a></li>
                        <li><a href="#">Điều Khoản Shopee</a></li>
                        <li><a href="#">Chính Sách Bảo Mật</a></li>
                        <li><a href="#">Chính Hãng</a></li>
                        <li><a href="#">Kênh Người Bán</a></li>
                        <li><a href="#">Flash Sales</a></li>
                    </ul>
                </Col>
                <Col span={4}>
                    <h4>THANH TOÁN</h4>
                </Col>
                <Col span={4}>
                    <h4>THEO DÕI CHÚNG TÔI TRÊN</h4>
                    <ul className='footerfollow'>
                        <li><FacebookOutlined /><a href="#"> Facebook</a></li>
                        <li><InstagramOutlined /><a href="#"> Instagram</a></li>
                        <li><LinkedinOutlined /><a href="#"> Linkedln</a></li>
                    </ul>

                </Col>
                <Col span={4}>
                    <h4>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h4>
                    <Row>
                        <Col span={12}>
                            <div className='sceenimg'>
                                <a href="#">
                                    <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/f184c0b68a2d385feb5d70a76396230b.png" alt="idsceen" />
                                </a>
                            </div>

                        </Col>
                        <Col span={12}>
                            <div className='service'>
                                <a href="#">
                                    <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/759416b55e2bd69ecc360ee2faab7ad0.png" alt="appStore" />
                                </a>
                                <a href="#">
                                    <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/2679f513b5f9e235adf2c6c288617e7b.png" alt="googlePlay" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={2}></Col>
            </Row>

            <div className='subfooter'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={6} className='textFT'>
                        <p>Copyright © 2019 by Quyet. All Rights Reserved.</p>
                    </Col>
                    <Col span={6}></Col>
                    <Col span={8} className='menufooter'>
                        <Row>
                            <Col span={4} className='textFT'>
                                <a href="#">Home </a>
                            </Col>
                            <Col span={5} className='textFT'>
                                <a href="#">Service  </a>
                            </Col>
                            <Col span={5} className='textFT'>
                                <a href="#">Portfolios </a>
                            </Col>
                            <Col span={4} className='textFT'>
                                <a href="#">Blogs </a>
                            </Col>
                            <Col span={4} className='textFT'>
                                <a href="#">Contact </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        </div>
    )
}

export default Footer;