"use client";
import React, { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Button, Select, Form as AntForm } from 'antd';
import { FileTextOutlined, TagsOutlined, FileAddOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const { TextArea } = Input;
const { Option } = Select;

type FormData = {
    _id: string,
    title: string,
    desciption: string,
    content: string,
    createdAt: Date,
    slug?: string,
    author: {
      _id: string,
      username: string,
      email: string
    },
    categories?: string[],
    tags: string[],
    views?: number,
    __v: number
}

interface BlogPostFormDateProps {
  formData : FormData
}

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  slug: Yup.string().required('Slug is required'),
  desciption: Yup.string().required('Description is required'),
  tags: Yup.array().of(Yup.string().required('At least one tag is required')),
});

const BlogPostEditForm:React.FC<BlogPostFormDateProps> = ({
  formData
}) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }
  return (
    <Formik
      initialValues={{
        title: formData.title,
        content: formData.content,
        slug: formData.slug,
        desciption: formData.desciption,
        tags: formData.tags,
      }}
      validationSchema={validationSchema}
      onSubmit={async(values)=>{
        var data;
        try {
          const post = {
            title: values.title,
            desciption: values.desciption,
            content: values.content,
            createdAt: Date.now() ,
            slug: values.slug ,
            author: JSON.parse(Cookies.get("user")).userId,
            tags: values.tags,
          }
          const response = await fetch('https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/'+formData._id, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
          });
          data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.msg || 'Something went wrong');
          }
          toast.success('BLog Create successfully');
          router.push("/profile")
        } catch (error) {
          toast.error(data.msg);
        }
      }}
    >
      {({ setFieldValue, handleSubmit,values,errors }) => (
        <AntForm
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
        >
            <AntForm.Item label="Title">
              <Field name="title" as={Input} prefix={<FileTextOutlined />} />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </AntForm.Item>

            <AntForm.Item label="Content">
              <Field name="content" as={TextArea} prefix={<FileTextOutlined />} rows={4} />
              <ErrorMessage name="content" component="div" className="text-red-500" />
            </AntForm.Item>

            <AntForm.Item label="Slug">
              <Field name="slug" as={Input} prefix={<FileTextOutlined />} />
              <ErrorMessage name="slug" component="div" className="text-red-500" />
            </AntForm.Item>

            <AntForm.Item label="Description">
              <Field name="desciption" as={TextArea} prefix={<FileTextOutlined />} rows={3} />
              <ErrorMessage name="desciption" component="div" className="text-red-500" />
            </AntForm.Item>

            <AntForm.Item label="Tags">
              <Field name="tags">
                {({ field }) => (
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Tags"
                    value={values.tags}
                    onChange={(value) => setFieldValue('tags', value)}
                    prefix={<TagsOutlined />}
                  >
                   <Option key="Sports">Sports</Option>
                    <Option key="Entertainment">Entertainment</Option>
                    <Option key="Twitter">Twitter</Option>
                    <Option key="WebDev">WebDev</Option>
                    <Option key="Science">Science</Option>
                    <Option key="Maths">Maths</Option>
                    <Option key="Hollywood">Hollywood</Option>
                    <Option key="Politics">Politics</Option>
                    <Option key="YouTube">YouTube</Option>
                    <Option key="Techonlogy">Techonlogy</Option>
                    <Option key="tag1">Tag1</Option>
                    <Option key="tag2">Tag2</Option>
                    <Option key="tag3">Tag3</Option>
                  </Select>
                )}
              </Field>
              <ErrorMessage name="tags" component="div" className="text-red-500" />
            </AntForm.Item>

            <AntForm.Item wrapperCol={{ span: 14, offset: 4 }}>
              <Button type="primary" htmlType="submit" icon={<FileAddOutlined />}>
                Submit
              </Button>
            </AntForm.Item>
          {/* </Form> */}
        </AntForm>
      )}
    </Formik>
  );
};

export default BlogPostEditForm;
