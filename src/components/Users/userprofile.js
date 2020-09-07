import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Tabs, Form, Input, Space, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../../asset/css/userprofile.css'
import { auth, database, storage } from 'firebase';

const UserProfile = () => {

  const { TabPane } = Tabs;

  const [Error, setError] = useState(null)
  const [userDB, setUserDB] = useState({
    fName: '',
    lName: '',
    userName: '',
    dayOfBirth: '',
    gender: '',
    address: '',
    password: '',
    cfpassword: '',
    phone: '',
    gmail: '',
    avatarUser: ''
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      let userID = user.uid
      var rootRef = database.ref('users/' + userID);
      rootRef.once('value')
        .then((snapshot) => {
          var data = (snapshot.val() || 'null');
          setUserDB({
            fName: data.fName,
            lName: data.lName,
            userName: data.userName,
            dayOfBirth: data.dayOfBirth,
            gender: data.gender,
            address: data.address,
            password: data.password,
            cfpassword: data.cfpassword,
            phone: data.phone,
            gmail: data.gmail,
            avatarUser: data.avatarUser
          })
        })
    });
  }, []);

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      var imagesRef = storage.ref().child('image_Profile/' + img.name);
      imagesRef.put(img).then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setUserDB({ ...userDB, avatarUser: downloadURL })
        });
      });
    }
  }

  const submitUpdateProfile = () => {
    auth.onAuthStateChanged((user) => {
      let userID = user.uid
      if (user) {
        database.ref('users/' + userID).update({
          fName: userDB.fName,
          lName: userDB.lName,
          userName: userDB.userName,
          gender: userDB.gender,
          phone: userDB.phone,
          gmail: userDB.gmail,
          dayOfBirth: userDB.dayOfBirth,
          address: userDB.address,
          avatarUser: userDB.avatarUser
        });
        alert('update thành công!')
        window.location = '/user-detail'
      };
    })
  }

  const submitChangePassWord = () => {
    if (userDB.password !== userDB.cfpassword) {
      alert('New Pass với Confirm Pass không trùng nhau')
    }
    if (userDB.password.length <= 5) {
      alert('* Password phải >= 6 kí tự')
    }
    else {
      auth.onAuthStateChanged((user) => {
        let userID = user.uid
        if (user) {
          auth.currentUser.updatePassword({ password: userDB.password }).then(function () {
            auth.ref('users/' + userID).update({
              password: userDB.password,
              cfpassword: userDB.cfpassword,
            });
            alert('thay đổi mật khẩu  thành công!')
            window.location = '/user-detail'
          })
        }
      })
    }
  }

  return (
    <div className='editForm'>
      <Row className='menuWC'>
        <Col span={2}> </Col>
        <Col span={20}>
          <Tabs defaultActiveKey='1' tabPosition='left' >
            <TabPane tab='Edit Profile' key='1'>
              <div className='imge-upload'>
                <label htmlFor='file-input'>
                  <img id='imgPF' src={userDB.avatarUser} alt="imgProfile" />
                </label>
                <input id="file-input" accept='image/*' type='file' onChange={(e) => handleChange(e)} />
              </div>
              <Form direction='vertical' labelCol={{ span: 7 }}
                wrapperCol={{ span: 18 }}>
                <Form.Item label='First Name: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input placeholder="Please enter your First Name"
                    required value={userDB.fName}
                    onChange={event => setUserDB(
                      {
                        ...userDB,
                        fName: event.target.value
                      }
                    )}></Input>
                </Form.Item>
                <Form.Item label='Last Name: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input placeholder="Please enter your Last Name" required
                    value={userDB.lName}
                    onChange={event => setUserDB(
                      {
                        ...userDB,
                        lName: event.target.value
                      }
                    )}></Input>
                </Form.Item>
                <Form.Item label='User Name: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input placeholder="Please enter your User Name" required
                    value={userDB.userName}
                    onChange={event => setUserDB(
                      {
                        ...userDB,
                        userName: event.target.value
                      }
                    )}></Input>
                </Form.Item>
                <Form.Item label='Address: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input placeholder="Please enter your Address" required
                    value={userDB.address}
                    onChange={event => setUserDB(
                      {
                        ...userDB,
                        address: event.target.value
                      }
                    )}></Input>
                </Form.Item>
                <Form.Item label='Day Of Birth: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input type="date" id="birthday" name="birthday" required
                    value={userDB.dayOfBirth}
                    onChange={event => setUserDB(
                      {
                        ...userDB,
                        dayOfBirth: event.target.value
                      }
                    )}></Input>
                </Form.Item>
                <Form.Item label='Gender'>
                  <Radio.Group name="radiogroup" wrapperCol={{ span: 18 }} value={userDB.gender}  >
                    <Radio value='Male' checked={userDB.gender === 1} onChange={event => setUserDB(
                      {
                        ...userDB,
                        gender: event.target.value
                      }
                    )} >Male</Radio>
                    <Radio value='Female' checked={userDB.gender === 2} onChange={event => setUserDB(
                      {
                        ...userDB,
                        gender: event.target.value
                      }
                    )} >Female</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label='Phone Number: '>
                  <Input placeholder="Please enter your Phone Number" type='number' required
                    value={userDB.phone}
                    onChange={event => setUserDB(
                      {
                        ...userDB,
                        phone: event.target.value
                      }
                    )}></Input>
                </Form.Item>
                <Form.Item label='Gmail: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input placeholder="Please enter Gmail" required disabled
                    value={userDB.gmail}
                    onChange={event => setUserDB(
                      {
                        ...userDB,
                        gmail: event.target.value
                      }
                    )}></Input>
                </Form.Item>
                <Button className='btnsaveEditPF' onClick={() => submitUpdateProfile()}>Update</Button>
              </Form>
            </TabPane>
            <TabPane tab='Change Password' key='2'>
              <div className='imge-upload'>
                <label htmlFor='file-input'>
                  <img id='imgPF' src={userDB.avatarUser} alt="imgProfile" />
                </label>
                <input id="file-input" accept='image/*' type='file' />
              </div>
              <Form labelCol={{ span: 7 }}
                wrapperCol={{ span: 18 }}>
                <Form.Item label='New PassWord:' >
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Space direction="vertical">
                    <Input.Password
                      placeholder="Password >= 6 characters"
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      onChange={event => setUserDB(
                        {
                          ...userDB,
                          password: event.target.value
                        }
                      )}
                    />
                  </Space>
                </Form.Item>
                <Form.Item label='Confirm PassWord:'>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Space direction="vertical">
                    <Input.Password
                      placeholder="Confirm Password"

                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      onChange={event => setUserDB(
                        {
                          ...userDB,
                          cfpassword: event.target.value
                        }
                      )}
                    />
                  </Space>
                </Form.Item>
                <Button className='btnchangePass' onClick={() => submitChangePassWord()} >Change PassWord</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  )
}

export default UserProfile;