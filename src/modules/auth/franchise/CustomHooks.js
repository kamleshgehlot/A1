import { useState, useEffect } from 'react';

const useSignUpForm = (state, callback, validate) => {
  const [inputs, setInputs] = useState(state);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    setIsSubmitting(true);
    setErrors(validate(inputs));
  };

  const cleanInputs = event =>{
    setInputs('');
  }
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleEditSubmit = event => {
    if(event){
      event.preventDefault();
    }
    callback();
  }

  const handleInputChange = e =>
    setInputs({
    ...inputs,
    [e.target.name]: e.target.value,
  });

  const handleReset = RESET_VALUES => {
    setInputs(inputs => RESET_VALUES);
    
  };

  const setInput = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return {
    handleSubmit,
    handleInputChange,
    handleEditSubmit,
    inputs,
    handleReset,
    setInput,
    errors,
    isSubmitting,
    cleanInputs
  };
};

export default useSignUpForm;
