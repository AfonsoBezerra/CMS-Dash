import { filter } from 'lodash';
import { faker } from '@faker-js/faker';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  Divider,
  CardHeader
} from '@mui/material';
import { TimelineDot } from '@mui/lab';
// components
import { useFormik } from 'formik';
import { BlogPostCard, BlogPostsSort } from '../blog';
import BlogPostsSearch from '../../../components/Search';
import { ProductList, ProductFilterSidebar } from '../products';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { SaleListHead } from '../sales';
import { OrderMoreMenu } from '../order';
//
// import TIMELINES from '../_mocks_/user';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    id_: '#54352',
    name: 'Nike',
    time: '02/01/2002',
    client: 'Gabriel Henrique',
    status: 'CANCELED',
    paypal: 'ELO',
    total: '$400,00'
  },
  {
    id_: '#543po',
    name: 'Puma',
    time: '02/07/2002',
    client: 'Alexandre Teixeira',
    status: 'SALE',
    paypal: 'VISA',
    total: '$250,00'
  },
  {
    id_: '#e43uy',
    name: 'Adidas',
    time: '02/08/2002',
    client: 'Renan',
    status: 'SALE',
    paypal: 'VISA',
    total: '$200,00'
  },
  {
    id_: '#ewq22',
    name: 'PUMA',
    time: '02/02/2002',
    client: 'Rafael Monteiro',
    status: 'CANCELED',
    paypal: 'MASTERCARD',
    total: '$350,00'
  },
  {
    id_: '#534w2',
    name: 'Nike Shok',
    client: 'Francisco',
    time: '02/10/2002',
    status: 'SALE',
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
        _user.time.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderTimeline() {
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
      const newSelecteds = TIMELINES.map((n) => n.id_);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
      orderRange: ''
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

    if (filterKeyValue === 'item') {
      setstats('Item Order');
    }

    if (filterKeyValue === 'bug') {
      setstats('Bug Report');
    }
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TIMELINES.length) : 0;

  const filteredTimeline = applySortFilter(TIMELINES, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredTimeline.length === 0;

  console.log(stats);
  return (
    <Card>
      <CardHeader title="Last Sales" subheader="(+13%) Sales" />
      <Scrollbar>
        <TableContainer sx={{ p: 3, pb: 1 }}>
          <Table>
            <SaleListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={TIMELINES.length}
              numSelected={selected.length}
            />

            <TableBody>
              {filteredTimeline.map((row) => {
                const { id_, client, name, time, status, total, paypal } = row;
                const isItemSelected = selected.indexOf(id_) !== -1;
                return (
                  <TableRow hover key={id_} tabIndex={-1}>
                    <TableCell align="left">{id_}</TableCell>
                    <TableCell align="left">{client}</TableCell>
                    <TableCell align="left">{name}</TableCell>
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
                        <Label variant="ghost" color={(status === 'SALE' && 'success') || 'error'}>
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
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          component={RouterLink}
          to="/dashboard/sale"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
