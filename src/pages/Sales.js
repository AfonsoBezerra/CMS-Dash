import { filter } from 'lodash';
// import { faker } from '@faker-js/faker';
// import { sentenceCase } from 'change-case';
import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid
} from '@mui/material';
import { TimelineDot } from '@mui/lab';
// components
import { useFormik } from 'formik';
import { AppWebSales } from '../sections/@dashboard/app';
// import { BlogPostCard, BlogPostsSort } from '../sections/@dashboard/blog';
// import BlogPostsSearch from '../components/Search';
// import { ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { OrderListHead, OrderMoreMenu } from '../sections/@dashboard/order';
import { SaleListToolbar } from '../sections/@dashboard/sales/index';
//
// import TIMELINES from '../_mocks_/user';

// ----------------------------------------------------------------------
const TIMELINES = [
  {
    id_: '#54352',
    name: 'Nike',
    time: '02/01/2002',
    client: 'Gabriel Henrique',
    status: 'Canceled',
    paypal: 'ELO',
    total: '$400,00'
  },
  {
    id_: '#543po',
    name: 'Puma',
    time: '02/07/2002',
    client: 'Alexandre Teixeira',
    status: 'Sale',
    paypal: 'VISA',
    total: '$250,00'
  },
  {
    id_: '#e43uy',
    name: 'Adidas',
    time: '02/08/2002',
    client: 'Renan',
    status: 'Sale',
    paypal: 'VISA',
    total: '$200,00'
  },
  {
    id_: '#534w2',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Sale',
    paypal: 'VISA',
    total: '$300,00'
  },
  {
    id_: '#53445',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Sale',
    paypal: 'VISA',
    total: '$300,00'
  },
  {
    id_: '#53545',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Sale',
    paypal: 'VISA',
    total: '$300,00'
  },
  {
    id_: '#53525',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Sale',
    paypal: 'VISA',
    total: '$300,00'
  },
  {
    id_: '#ERWDS',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Sale',
    paypal: 'VISA',
    total: '$300,00'
  },

  {
    id_: '#53115',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Sale',
    paypal: 'VISA',
    total: '$300,00'
  },
  {
    id_: '#53532',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Canceled',
    paypal: 'VISA',
    total: '$300,00'
  },
  {
    id_: '#5352s',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Sale',
    paypal: 'VISA',
    total: '$300,00'
  },
  {
    id_: '#53w45',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Canceled',
    paypal: 'VISA',
    total: '$300,00'
  },
  {
    id_: '#53w15',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Canceled',
    paypal: 'VISA',
    total: '$300,00'
  },
  {
    id_: '#53135',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'Canceled',
    paypal: 'VISA',
    total: '$300,00'
  }
];
const TABLE_HEAD = [
  { id: 'id_', label: 'Id', alignRight: false },
  { id: 'client', label: 'Client', alignRight: false },
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'time', label: 'Date', alignRight: false },
  { id: 'total', label: 'Total', alignRight: false },
  { id: 'paypal', label: 'Paypal', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '', label: '', alignRight: false }
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return 1;
  }
  if (b[orderBy] > a[orderBy]) {
    return -1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.id_.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.client.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.paypal.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Sale() {
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('time');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [product, setProduct] = useState(TIMELINES);
  const [stats, setstats] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredTimeline
        .filter((row) =>
          stats === '' ? row.status === 'Sale' || row.status === 'Canceled' : row.status === stats
        )
        .map((n) => n.id_);

      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };
  function filterProducts(event) {
    const filterKey = event.target.value;
    const filteredProduct = TIMELINES.filter((product) =>
      product.id_.toLocaleLowerCase().includes(filterKey.toLocaleLowerCase())
    );

    setProduct(filteredProduct);
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const formik = useFormik({
    initialValues: {
      salesRange: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
    setProduct(TIMELINES);
    setstats('');
  };

  const onRadioPriceChange = (ev) => {
    const filterKeyValue = ev.target.value;

    if (filterKeyValue === 'sale') {
      setstats('Sale');
    }

    if (filterKeyValue === 'cancel') {
      setstats('Canceled');
    }
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TIMELINES.length) : 0;

  const filteredTimeline = applySortFilter(TIMELINES, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredTimeline.length === 0;

  return (
    <Page title="DashBoard: Sale" name="Sale">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Sale
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebSales />
          </Grid>
          <Grid item xs={12} md={6} lg={12} />
        </Grid>
        <Card>
          <SaleListToolbar
            numSelected={selected.length}
            onResetFilter={handleResetFilter}
            filterName={filterName}
            onFilterName={handleFilterByName}
            isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            formik={formik}
            onCloseFilter={handleCloseFilter}
            onRadioPriceChange={onRadioPriceChange}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 600 }}>
              <Table>
                <OrderListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={
                    filteredTimeline.filter((row) =>
                      stats === ''
                        ? row.status === 'Sale' || row.status === 'Canceled'
                        : row.status === stats
                    ).length
                  }
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredTimeline
                    .filter((row) =>
                      stats === ''
                        ? row.status === 'Sale' || row.status === 'Canceled'
                        : row.status === stats
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id_, client, name, time, status, total, paypal } = row;
                      const isItemSelected = selected.indexOf(id_) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id_}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id_)}
                            />
                          </TableCell>
                          <TableCell align="left">{id_}</TableCell>
                          <TableCell align="left">{client}</TableCell>
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subname" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{time}</TableCell>
                          <TableCell align="left">{total}</TableCell>
                          <TableCell align="left">{paypal}</TableCell>
                          <TableCell align="left">
                            <TimelineDot
                              sx={{
                                bgcolor: 'transparent',
                                boxShadow: 'none'
                                // color:
                                //   (status === 'order1' && 'success.main') ||
                                //   (status === 'order2' && 'warning.main') ||
                                //   (status === 'order3' && 'error.main')
                              }}
                            >
                              <Label
                                variant="ghost"
                                color={(status === 'Sale' && 'success') || 'error'}
                              >
                                {status}
                              </Label>
                            </TimelineDot>
                          </TableCell>
                          <TableCell align="right">
                            <OrderMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              filteredTimeline.filter((row) =>
                stats === ''
                  ? row.status === 'Sale' || row.status === 'Canceled'
                  : row.status === stats
              ).length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
