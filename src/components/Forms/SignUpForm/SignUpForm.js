import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import FormBuilder from 'antd-form-builder';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apolloClient } from '../../../util';
import { USER_FIND_ONE, USER_SIGN_UP } from '../../../api/user';
import * as action from '../../../store/actions';

function SignUpForm(props) {
  const { auth, getCurrentUser } = props;

  const [form] = Form.useForm();

  const handleSignUpSubmit = async (values) => {
    console.log(values);
    const { email, password } = values;
    const response = await apolloClient.mutate({
      mutation: USER_SIGN_UP,
      variables: {
        email,
        password,
      },
    });
    console.log(response);
    await auth(email, password);
    await getCurrentUser();
  };

  const meta = {
    fields: [
      {
        key: 'email',
        hasFeedback: true,
        required: true,
        widgetProps: {
          prefix: <MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />,
        },
        placeholder: 'Email',
        rules: [
          {
            validator: (rule, value, callback) => {
              // Do async validation to check if username already exists
              return apolloClient
                .query({
                  query: USER_FIND_ONE,
                  variables: { filter: { email: value } },
                  fetchPolicy: 'network-only',
                })
                .then((foundUserResponse) => {
                  if (foundUserResponse.data.userOne) {
                    callback(new Error('Email Exists'));
                  } else {
                    callback();
                  }
                })
                .catch((error) => {
                  console.error(error);
                  callback(new Error('Please try again'));
                });
            },
          },
          { type: 'email', message: 'Invalid email address' },
        ],
      },
      {
        key: 'password',
        widget: 'password',
        onChange: () => {
          if (form.isFieldTouched('confirmPassword')) {
            form.validateFields(['confirmPassword']);
          }
        },
        widgetProps: {
          prefix: <LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />,
        },
        placeholder: 'Password',
        rules: [
          // This is equivalent with "required: true"
          {
            required: true,
            min: 6,
            message: 'Please Type Password',
          },
          {
            required: true,
            message: 'Password is required',
          },
        ],
      },
      {
        key: 'confirmPassword',
        widget: 'password',
        required: true,
        widgetProps: {
          prefix: <LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />,
        },
        placeholder: 'Confirm Password',
        rules: [
          {
            validator: (rule, value, callback) => {
              if (value !== form.getFieldValue('password')) {
                callback(new Error('Two passwords are inconsistent.'));
              } else {
                callback();
              }
            },
          },
        ],
      },
    ],
  };

  return (
    <div>
      <Form onFinish={handleSignUpSubmit}>
        <FormBuilder meta={meta} form={form} />
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

SignUpForm.propTypes = {
  auth: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password) => dispatch(action.auth(email, password)),
  getCurrentUser: () => dispatch(action.getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
