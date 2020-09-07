import React from 'react'
import { Row, Col, Carousel } from 'antd'
import '../../asset/css/slider.css'
import slide1 from '../../asset/images/slide1.png'
import slide2 from '../../asset/images/slide2.png'

const Slider = () => {
    return (
        <div className='container'>
            <div className='slider'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Row>
                            <Col span={16}>
                                <Carousel autoplay>
                                    <div className='showslide'>
                                        <img src={slide1} alt="slide1" />
                                    </div>
                                    <div>
                                        <img src={slide2} alt="slide2" />
                                    </div>
                                </Carousel>
                            </Col>
                            <Col span={8}>
                                <div className='showslide2'> <img src={slide1} alt="slide1" />
                                    <img src={slide2} alt="slide2" />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>

        </div>
    )
}

export default Slider;