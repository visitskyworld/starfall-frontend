import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import request from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Spinner from './components/Spinner';

const SubscribeSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('This field is required'),
});

interface SubscribeInterface {
  email: string;
}

interface ErrorResponse {
  message: string;
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      handleLoading();
    }, 2500);
  }, []);

  const handleSubmit = async (values: SubscribeInterface) => {
    try {
      const res = await axios.post(
        window.location.origin + '/api/subscribe',
        values
      );
      if (res.data.email) {
        toast.success('Successfully subscribed!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (err) {
      if (request.isAxiosError(err) && err.response) {
        toast.error((err.response?.data as ErrorResponse).message);
      }
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="relative w-[100vw] h-[100vh] bg-[url('./assets/img/background.png')] bg-no-repeat bg-cover bg-[center_center]">
          <div className="absolute w-full h-full flex justify-center items-center animate-fade-in">
            <img
              className="select-none lg:w-[650px] md:w-[500px] sm:w-[350px] w-[350px] translate-y-[-110%]"
              src="/starfall.png"
              alt="logo"
            />
          </div>
          <div className="absolute bottom-[60px] flex w-full justify-center px-5">
            <div className="flex flex-col">
              <span className="text-white text-base font-medium uppercase">
                Submit your email address to be notified of updates:
              </span>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={SubscribeSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {({ errors }) => (
                  <Form className="w-full flex mt-4 focus-visible:outline-none">
                    <div className="w-full flex max-sm-col">
                      <div className="flex flex-col grow">
                        <div className="flex w-full max-sm-width items-center p-2 border-2 border-white rounded-sm !bg-transparent">
                          <Field
                            name="email"
                            type="email"
                            autoComplete="off"
                            className="w-full text-xl text-white bg-transparent outline-none"
                          />
                        </div>
                        <div className="text-[#fa2323] font-bold h-6">
                          {errors.email ? errors.email : ''}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="border-2 border-white outline-none px-2 py-1 mb-6 text-white font-normal text-sm uppercase"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default App;
