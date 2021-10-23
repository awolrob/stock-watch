
import React, { useState, useEffect } from 'react';
import { createUser } from '../utils/API';
import Auth from '../utils/auth';
import { Form, Button, Alert } from 'react-bootstrap';
// import { Form, Input, Button } from 'antd';
// import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';


const SignupForm = () => {

    // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    console.log(event);
    
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form 
      noValidate validated={validated} 
      onSubmit={handleFormSubmit}
      name="basic"
      labelCol={{ span: 8, }}
      wrapperCol= {{ span:16, }}
      >
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group
          label="Username" 
          name="user"
          onValuesChange={handleInputChange}
          value={userFormData.username}
          rules= {[
            {
              required: true,
              message: 'Username is required!'
            }
          ]}
          >
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />

          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          // disabled={!(userFormData.username)}
          type='submit'
          variant='success'
          htmlType="submit"
          >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;


  // const [form] = Form.useForm();
  // const [, forceUpdate] = useState({}); 
  // To disable submit button at the beginning.
  // const [validated, setValidated] = useState(false);


  // useEffect(() => {
  //   forceUpdate({});
  // }, []);

  // const onFinish = (values) => {

  //     console.log('Finish:', values);
      

  //     if (form.checkValidity() === false) {
  //       values.preventDefault();
  //       values.stopPropagation();
  //     }
  //       try {
  //         const response = createUser(values);
    
  //         if (!response.ok) {
  //           throw new Error('something went wrong!');
  //         }
    
  //         const { token, user } = response.json();
  //         console.log(user);
  //         Auth.login(token);
  //       } catch (err) {
  //         console.error(err);
  //         setShowAlert(true);
  //       }
  // };


  //   <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
  //   <Form.Item
  //     name="username"
  //     rules={[
  //       {
  //         required: true,
  //         message: 'Please input your username!',
  //         // validated: {setValidated}
  //       },
  //     ]}
  //   >
  //     <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
  //   </Form.Item>
  //   <Form.Item
  //     name="email"
  //     rules={[
  //       {
  //         required: true,
  //         message: 'Please input your email!',
  //         // validated: {validated},
  //       },
  //     ]}
  //   >
  //     <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email" />
  //   </Form.Item>
  //   <Form.Item
  //     name="password"
  //     rules={[
  //       {
  //         required: true,
  //         message: 'Please input your password!',
  //         // validated: {validated},
  //       },
  //     ]}
  //   >
  //     <Input
  //       prefix={<LockOutlined className="site-form-item-icon" />}
  //       type="password"
  //       placeholder="Password"
  //     />
  //   </Form.Item>
  //   <Form.Item shouldUpdate>
  //     {() => (
  //       <Button
  //         type="primary"
  //         htmlType="submit"
  //         // onClick={handleFormSubmit}
  //         disabled={
  //           !form.isFieldsTouched(true) ||
  //           !!form.getFieldsError().filter(({ errors }) => errors.length).length
  //         }
          
  //       >
  //         Sign Up!
  //       </Button>
  //     )}
  //   </Form.Item>
  // </Form>
