import { fireEvent, render } from "@testing-library/react";

import AddCardForm from "../AddCardForm";

describe("AddCardForm", () => {
  const handleChangeSingleInput = jest.fn();
  const handleChangeMultipleInput = jest.fn();

  const initialFields = {
    cardNumbers: {
      firstField: "",
      secondField: "",
      thirdField: "",
      fourthField: "",
    },
    expiryDate: {
      monthField: "",
      yearField: "",
    },
    cardOwner: "",
  };

  const makeAddCardForm = (fields = initialFields) =>
    render(
      <AddCardForm
        fields={fields}
        onChangeSingleInput={handleChangeSingleInput}
        handleChangeMultipleInput={handleChangeMultipleInput}
      />
    );

  it("카드 번호 Input을 렌더링합니다", () => {
    const { queryByLabelText } = makeAddCardForm();

    expect(queryByLabelText("카드 번호")).toBeInTheDocument();
  });

  it("만료일 Input을 렌더링합니다", () => {
    const { queryByLabelText } = makeAddCardForm();

    expect(queryByLabelText("만료일")).toBeInTheDocument();
  });

  it("카드 소유자 Input을 렌더링합니다", () => {
    const { queryByLabelText } = makeAddCardForm();

    expect(
      queryByLabelText("카드 소유자이름(선택)")
    ).toBeInTheDocument();
  });

  it("카드 소유자 Input 값의 길이를 렌더링합니다", () => {
    const cardOwner = "HEAEUN";

    const { queryByText } = makeAddCardForm({
      ...initialFields,
      cardOwner,
    });

    expect(queryByText(`${cardOwner.length}/30`)).toBeInTheDocument();
  });

  it("카드 소유자 Input을 값이 변경되면 change 이벤트 핸들러가 실행됩니다", () => {
    const { getByLabelText } = makeAddCardForm();

    fireEvent.change(getByLabelText("카드 소유자이름(선택)"), {
      target: {
        value: 11,
      },
    });

    expect(handleChangeSingleInput).toBeCalledWith({
      name: "cardOwner",
      value: "11",
    });
  });
});
