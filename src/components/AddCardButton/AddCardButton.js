import styled from "@emotion/styled";

import Item from "../style/card";

const AddCardButton = () => {
  return (
    <Button as="button" aria-label="카드 추가">
      +
    </Button>
  );
};

const Button = styled(Item)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-size: 30px;
  color: #575757;
`;

export default AddCardButton;
