import { useState } from "react";

const isMaximumLength = ({ maxLength, value }) =>
  maxLength && value.length > maxLength;

const useCardNumberFields = () => {
  const [fields, setFields] = useState({
    cardNumbers: {
      firstField: "",
      secondField: "",
      thirdField: "",
      fourthField: "",
    },
  });

  const handleChangeSingleInput = ({ maxLength, name, value }) => {
    if (isMaximumLength({ maxLength, value })) {
      return;
    }

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeMultipleInput = ({ maxLength, key, name, value }) => {
    if (isMaximumLength({ maxLength, value })) {
      return;
    }

    setFields((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [name]: value,
      },
    }));
  };

  return {
    fields,
    handleChangeSingleInput,
    handleChangeMultipleInput,
  };
};

export default useCardNumberFields;