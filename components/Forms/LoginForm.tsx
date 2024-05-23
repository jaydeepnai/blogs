"use client";
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Button, Form as AntForm } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const router = useRouter()

  const handleSubmit = async (values) => {
    var data;
    try {
      const response = await fetch('https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }else{
        toast.success('Login successful');
        Cookies.set("user",JSON.stringify(data.user))
      }
      setTimeout(() => {
        router.push("/home")
      }, 2000);
    } catch (error) {
      toast.error(error.message);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login to Contienue</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({handleSubmit}) => (
            <AntForm  layout="vertical"  onFinish={handleSubmit}>
 
                <AntForm.Item label="Email">
                  <Field name="email" as={Input} prefix={<MailOutlined />} />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </AntForm.Item>

                <AntForm.Item label="Password">
                  <Field name="password" as={Input.Password} prefix={<LockOutlined />} />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </AntForm.Item>

                <AntForm.Item>
                  <Button type="primary" htmlType="submit" block>
                    Login
                  </Button>
                </AntForm.Item>
                <h5 className="text-sm  text-center mb-4">Don't Have Account ? 
                <Link href="signup" className='font-bold'> Register</Link>
                </h5>
            </AntForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
