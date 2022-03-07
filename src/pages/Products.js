import { useFormik } from 'formik';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
import Iconify from '../components/Iconify';
import ProductsSearch from '../components/Search';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [product, setProduct] = useState(PRODUCTS);

  function filterProducts(event) {
    const filterKey = event.target.value;
    const filteredProduct = PRODUCTS.filter((product) =>
      product.name.toLocaleLowerCase().includes(filterKey.toLocaleLowerCase())
    );

    setProduct(filteredProduct);
  }

  const formik = useFormik({
    initialValues: {
      colors: '',
      priceRange: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
    setProduct(PRODUCTS);
  };

  const onRadioPriceChange = (ev) => {
    const filterKeyValue = ev.target.value;

    setProduct(
      PRODUCTS.filter((a) => {
        if (filterKeyValue === 'below') {
          return a.price ? a.price <= 25 : a.priceSale <= 25;
        }
        if (filterKeyValue === 'between') {
          return a.price ? a.price >= 25 && a.price <= 75 : a.priceSale >= 25 && a.priceSale <= 75;
        }

        return a.price ? a.price >= 75 : a.priceSale >= 75;
      })
    );
  };

  const handleChange = () => {
    const colors = document.querySelectorAll('[name="colors"]');

    colors.forEach((color) => {
      if (color.checked) {
        setProduct(PRODUCTS.filter((product) => product.colors.includes(color.value)));
      }
    });
  };

  return (
    <Page title="DashBoard: Products">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product
          </Button>
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ProductsSearch searchFor="product" onChangeFunc={(ev) => filterProducts(ev)} />

          <Stack direction="row" alignItems="center">
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              onRadioPriceChange={onRadioPriceChange}
              myHandleChange={handleChange}
            />
          </Stack>
        </Stack>

        <ProductList products={product} />
      </Container>
    </Page>
  );
}
