import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';
import CreateProduct from '../components/Products/createProductView';
import AddVariants from '../components/Products/addVariants';

describe('Create Product screen', () => {
  // beginning of 'createProductView' testing
  test('renders navbar', () => {
    const { getByText } = renderWithProviders(<CreateProduct />);
    const Navbar = getByText(/home/i);
    expect(Navbar).toBeVisible();
  });
  test('renders the createProductWrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Wrapper = getByTestId('createProductWrapper');
    expect(Wrapper).toBeVisible();
  });

  test('renders the secondary wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Wrapper = getByTestId('createProductSecondaryWrapper');
    expect(Wrapper).toBeVisible();
  });
  test('renders main header', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const MainHeader = getByTestId('mainProductHeader');
    expect(MainHeader).toBeVisible();
  });
  test('renders the save product button', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const SaveProductButton = getByTestId('saveProductButton');
    expect(SaveProductButton).toBeVisible();
    expect(SaveProductButton).toBeEnabled();
  });
  test('renders main header', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const MainHeader = getByTestId('mainProductHeader');
    expect(MainHeader).toBeVisible();
  });

  test('renders main variants wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const VariantsWrapper = getByTestId('basicDetailsVariantsWrapper');
    expect(VariantsWrapper).toBeVisible();
  });

  test('renders main variants left side wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const LeftWrapper = getByTestId('basicDetailsLeftWrapper');
    expect(LeftWrapper).toBeVisible();
  });
  // beginning of 'basicDetails' testing
  test('renders basic details main wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const MainWrapper = getByTestId('basicDetailsContainer');
    expect(MainWrapper).toBeVisible();
  });
  test('renders Basic Details Header', () => {
    const { getByText } = renderWithProviders(<CreateProduct />);
    const Header = getByText(/basic details:/i);
    expect(Header).toBeVisible();
  });

  test('renders basic details form wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const FormWrapper = getByTestId('basicDetailsFormContainer');
    expect(FormWrapper).toBeVisible();
  });

  test('renders basic details input container', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const DetailsWrapper = getByTestId('basicDetailsInputContainer');
    expect(DetailsWrapper).toBeVisible();
  });
  test('renders product name input', () => {
    const { getByPlaceholderText } = renderWithProviders(<CreateProduct />);
    const ProductName = getByPlaceholderText(/awesome t-shirt/i);
    expect(ProductName).toBeVisible();
    expect(ProductName).toBeEnabled();
  });
  test('renders basic details input container for add product', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Errors = getByTestId('addProductNameError');
    expect(Errors).toBeInTheDocument();
  });
  test('renders basic details input container for price', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Errors = getByTestId('basicDetailsInputWrapper');
    expect(Errors).toBeVisible();
  });
  test('renders basic details dollar div', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const DollarDiv = getByTestId('dollarWrapper');
    expect(DollarDiv).toBeVisible();
  });
  test('renders price name', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Pricename = getByTestId('priceName');
    expect(Pricename).toBeVisible();
  });

  test('renders category input container', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const InputContainer = getByTestId('secondaryInputWrapper');
    expect(InputContainer).toBeVisible();
  });

  test('renders category input', () => {
    const { getByPlaceholderText } = renderWithProviders(<CreateProduct />);
    const CategoryInput = getByPlaceholderText(/Select a category/i);
    expect(CategoryInput).toBeVisible();
    expect(CategoryInput).toBeEnabled();
  });

  test('renders category input container', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const CatName = getByTestId('categoryNameError');
    expect(CatName).toBeVisible();
  });

  test('renders basic details container', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Wrapper = getByTestId('basicDetailsDescriptionWrapper');
    expect(Wrapper).toBeVisible();
  });
  // beginning of addVariants testing
  test('renders add variants container', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Wrapper = getByTestId('addVariantsMainWrapper');
    expect(Wrapper).toBeVisible();
  });
  test('renders create products wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Wrapper = getByTestId('createProductContainer');
    expect(Wrapper).toBeVisible();
  });
  test('renders create products header wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Header = getByTestId('createProductHeaderWrapper');
    expect(Header).toBeVisible();
  });
  test('renders create products text wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const TextWrapper = getByTestId('createProductTextContainer');
    expect(TextWrapper).toBeVisible();
  });

  test('renders Basic Details Header', () => {
    const { getByText } = renderWithProviders(<CreateProduct />);
    const Variants = getByText(/variants:/i);
    expect(Variants).toBeVisible();
  });
  test('renders Basic Details options', () => {
    const { getByText } = renderWithProviders(<CreateProduct />);
    const VariantHeader = getByText(
      /Product options a customer can choose from./i
    );
    expect(VariantHeader).toBeVisible();
  });
  test('renders Basic Details link', () => {
    const { getByText } = renderWithProviders(<CreateProduct />);
    const Learn = getByText(/Learn More/i);
    expect(Learn).toBeVisible();
  });
  test('renders create variants button', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Button = getByTestId('createVariantsButton');
    expect(Button).toBeVisible();
    expect(Button).toBeEnabled();
  });
  // beginning of 'addPhoto' testing
  test('renders add photo wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Wrapper = getByTestId('addPhotoWrapper');
    expect(Wrapper).toBeVisible();
  });

  test('renders add photo header wrapper', () => {
    const { getByTestId } = renderWithProviders(<CreateProduct />);
    const Header = getByTestId('photoHeaderWrapper');
    expect(Header).toBeVisible();
  });

  test('renders Basic Details options', () => {
    const { getByText } = renderWithProviders(<CreateProduct />);
    const Header = getByText(/Photos/i);
    expect(Header).toBeVisible();
  });

  test('renders create variants button', () => {
    const { getByText } = renderWithProviders(<CreateProduct />);
    const Button = getByText(/Add Photo/i);
    expect(Button).toBeVisible();
    expect(Button).toBeEnabled();
  });
});
