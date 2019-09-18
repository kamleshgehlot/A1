import { useState, useEffect } from 'react';

const useSignUpForm = (state, callback, validate) => {
  const [inputs, setInputs] = useState(state);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validDecimalNumber = /^\d*\.?\d*$/;
  const validNumber = /^[0-9]*$/;

  const handleSubmit = event => {
    console.log(errors)
    console.log(inputs)
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

  const handleInputChange = e => {
    
    setInputs({
    ...inputs,
    [e.target.name]: e.target.value,
  });
  }

  const handleNumberInput = e => {
    if (e.target.value === '' || validNumber.test(e.target.value)) {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  }

  const handlePriceInput = e => {
    if (e.target.value === '' || validDecimalNumber.test(e.target.value)) {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  }

  const handleReset = RESET_VALUES => {
    setInputs(inputs => RESET_VALUES);
    
  };

  const setInput = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });    
  };

  const setInputsAll = e => {
    setInputs(inputs => e);
  }

  return {
    handleSubmit,
    handleInputChange,
    handleEditSubmit,
    inputs,
    handleReset,
    setInputsAll,
    setInput,
    errors,
    isSubmitting,
    cleanInputs,
    handleNumberInput, handlePriceInput,
  };
};

export default useSignUpForm;
