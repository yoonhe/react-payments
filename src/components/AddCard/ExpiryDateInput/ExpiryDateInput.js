import { EXPIRY_DATE_LABEL } from "../constants";

import useExpiryDateFieldsRef from "./hooks/useExpiryDateFieldsRef";

import InputGroup from "../InputGroup";
import Input from "../Input";

import * as InputStyle from "../../style/input";

import isFullField from "../utils/isFullField";
import isNotNumber from "../utils/isNotNumber";
import VALIDATIONS from "../validations";
import styled from "@emotion/styled";

const ExpiryDateInput = ({
  fields,
  error,
  onChange,
  onErrorChange,
}) => {
  const { monthField, yearField } = fields;

  const { monthInput, yearInput } = useExpiryDateFieldsRef({
    fields,
  });

  const handleChange = ({ name, value }) => {
    if (isNotNumber(value)) {
      return;
    }

    if (name === "monthField") {
      const isError =
        value !== "" && (Number(value) > 12 || Number(value) < 1);

      onErrorChange({
        key: "expiryDate",
        error: isError,
      });
    }

    onChange({ key: "expiryDate", name, value });
  };

  const inputProperties = [
    {
      id: "expiry-date",
      ariaLabel: EXPIRY_DATE_LABEL.month,
      ref: monthInput,
      type: "number",
      name: "monthField",
      placeholder: "MM",
      value: monthField,
      maxLength: 2,
    },
    {
      ariaLabel: EXPIRY_DATE_LABEL.year,
      ref: yearInput,
      type: "number",
      name: "yearField",
      placeholder: "YY",
      value: yearField,
      maxLength: 2,
    },
  ];

  return (
    <InputStyle.Container>
      <InputStyle.Label htmlFor="expiry-date">
        만료일
      </InputStyle.Label>
      <InputStyle.Group>
        {inputProperties.map((property, index) => {
          const { name, maxLength, ref } = property;

          const prevInput = inputProperties[index - 1];

          const isVisible =
            index !== 0 &&
            isFullField({
              field: prevInput.value,
              maxLength,
            });

          return (
            <InputGroup key={name} separator={isVisible && "/"}>
              <Input
                {...property}
                ref={ref}
                onChange={handleChange}
              />
            </InputGroup>
          );
        })}
      </InputStyle.Group>
      {error && (
        <ErrorMessage>{VALIDATIONS.expiryDateMonth}</ErrorMessage>
      )}
    </InputStyle.Container>
  );
};

const ErrorMessage = styled.p`
  margin-top: 5px;
  color: red;
`;

export default ExpiryDateInput;
