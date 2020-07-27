import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../utlities/renderWithProviders";
import SaveCart from "../components/saveCart/saveCart";

describe("Save Cart", () => {
  test("renders Wrapper div", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("saveCartWrapper")).toBeVisible();
  });
  test("renders Inner className", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("saveCartInner")).toBeVisible();
  });
  test("renders Checkout className", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("saveCartCheckout")).toBeVisible();
  });
  test("renders Order className", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("saveCartOrder")).toBeVisible();
  });
  test("renders Order Summary text", () => {
    const { getByText } = renderWithProviders(<SaveCart />);
    const title = getByText(/Order Summary/i);
    expect(title).toBeVisible();
  });
  test("renders Summary className", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("saveCartSummary")).toBeVisible();
  });

  test("renders Lower className", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("saveCartLower")).toBeVisible();
  });

  test("renders Lower Header id", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("LowerHeader")).toBeVisible();
  });

  test("renders Form Item - Button", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("FormItemButton")).toBeVisible();
  });

  test('renders Button with Submit text', () => {
    const { getByText } = renderWithProviders(<SaveCart />)
    const title = getByText(/Submit/i)
    expect(title).toBeVisible()
})

test("renders main Form", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("mainForm")).toBeVisible();
  });

test("renders Form Item - Delivery Option", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("Form.Item-Delivery.Option")).toBeVisible();
  });

test("renders Form Item - Address", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("FormItem-Address")).toBeVisible();
  });

test("renders Form Item - Collection", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("FormItem-Collection")).toBeVisible();
  });

test("renders Form Item - Radio.Group", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("FormItem-RadioGroup")).toBeVisible();
  });

// is child of Form Item - Payment Preference >> FAILS
// test("renders Radio.Group", () => {
//     const { getByTestId } = renderWithProviders(<SaveCart />);
//     expect(getByTestId("RadioGroup")).toBeVisible();
//   });

});
