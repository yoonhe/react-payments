import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import { MdOutlineArrowBackIosNew } from "react-icons/md";

import useAddCardFormFields from "./hooks/useAddCardFormFields";

import AddCardForm from "../../components/AddCard/AddCardForm";
import Card from "../../components/Card";
import Button from "../../components/Button";

import { Title } from "../../components/style/layout";
import ButtonGroup from "../../components/style/button";

const AddCardPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const handleNextClick = () => {
    navigate("/add/card/complete");
  };

  const {
    fields,
    handleChangeSingleInput,
    handleChangeMultipleInput,
    handleErrorChange,
  } = useAddCardFormFields();

  const {
    cardNumbers: { firstField, secondField },
    expiryDate: { yearField, monthField },
    cardOwner,
  } = fields;

  return (
    <>
      <Title>
        <PrevButton aria-label="뒤로가기" onClick={handleClick}>
          <MdOutlineArrowBackIosNew />
        </PrevButton>
        카드 추가
      </Title>
      <main>
        <FormCard
          data={{
            numbers: [firstField, secondField],
            expiryDate: `${monthField}/${yearField}`,
            owner: cardOwner,
          }}
        />
        <AddCardForm
          fields={fields}
          onChangeSingleInput={handleChangeSingleInput}
          onChangeMultipleInput={handleChangeMultipleInput}
          onErrorChange={handleErrorChange}
        />
        <ButtonGroup>
          <Button onClick={handleNextClick}>다음</Button>
        </ButtonGroup>
      </main>
    </>
  );
};

const FormCard = styled(Card)`
  margin: 0 auto 40px;
`;

const PrevButton = styled.button`
  padding: 10px 10px 10px 0;
`;

export default AddCardPage;
