import React from 'react';
import { Form, Button, Icon, Input } from 'antd';
import FormBuilder from 'antd-form-builder';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';

function LoginForm(props) {
  const { form, auth, getCurrentUser } = props;

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    await form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        const { email, password } = values;
        try {
          await auth(email, password);
          await getCurrentUser();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const meta = {
    fields: [
      {
        key: 'email',
        required: true,
        placeholder: 'Email',
        widgetProps: {
          prefix: <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />,
        },
      },
      {
        key: 'password',
        required: true,
        widget: 'password',
        placeholder: 'Password',
        widgetProps: {
          prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
        },
      },
    ],
  };

  return (
    <div>
      <Form onSubmit={handleLoginSubmit}>
        <FormBuilder meta={meta} form={form} />
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Input style={{ display: 'none' }} />
    </div>
  );
}

LoginForm.propTypes = {
  form: PropTypes.shape({ validateFields: PropTypes.func }).isRequired,
  auth: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password) => dispatch(action.auth(email, password)),
  getCurrentUser: () => dispatch(action.getCurrentUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'login_form' })(LoginForm));
