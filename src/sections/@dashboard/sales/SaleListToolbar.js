import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Form, FormikProvider } from 'formik';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Drawer,
  Divider,
  Button,
  Stack,
  RadioGroup,
  FormControlLabel,
  Box,
  Radio
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import ColorManyPicker from '../../../components/ColorManyPicker';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' }
];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'sale', label: 'Sale' },
  { value: 'cancel', label: 'Canceled' }
];

export const FILTER_COLOR_OPTIONS = [
  { value: 'year', label: 'Year' },
  { value: 'month', label: 'Month' }
];

// ----------------------------------------------------------------------

SaleListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  isOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object,
  onOpenFilter: PropTypes.func,
  myHandleChange: PropTypes.func,
  changeColorPicker: PropTypes.func,
  onRadioPriceChange: PropTypes.func,
  onResetFilter: PropTypes.func
};

export default function SaleListToolbar({
  numSelected,
  filterName,
  onFilterName,
  isOpenFilter,
  formik,
  onCloseFilter,
  onOpenFilter,
  onRadioPriceChange,
  onResetFilter
}) {
  const { values, getFieldProps, handleChange } = formik;
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search order..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <RootStyle>
          <Button
            disableRipple
            color="inherit"
            endIcon={<Iconify icon="ic:round-filter-list" />}
            onClick={onOpenFilter}
          >
            Filters&nbsp;
          </Button>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate>
              <Drawer
                anchor="right"
                open={isOpenFilter}
                onClose={onCloseFilter}
                PaperProps={{
                  sx: { width: 280, border: 'none', overflow: 'hidden' }
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ px: 1, py: 2 }}
                >
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    Filters
                  </Typography>
                  <IconButton onClick={onCloseFilter}>
                    <Iconify icon="eva:close-fill" width={20} height={20} />
                  </IconButton>
                </Stack>

                <Divider />

                <Scrollbar>
                  <Stack spacing={3} sx={{ p: 3 }}>
                    {/* <div>
                      <Typography variant="subtitle1" gutterBottom>
                        Date
                      </Typography>
                      <RadioGroup {...getFieldProps('priceRange')}>
                        {FILTER_PRICE_OPTIONS.map((item) => (
                          <FormControlLabel
                            onClick={onRadioPriceChange}
                            key={item.value}
                            value={item.value}
                            control={<Radio />}
                            label={item.label}
                          />
                        ))}
                      </RadioGroup>
                    </div> */}
                    <div>
                      <Typography variant="subtitle1" gutterBottom>
                        Order
                      </Typography>
                      <RadioGroup {...getFieldProps('orderRange')}>
                        {FILTER_PRICE_OPTIONS.map((item) => (
                          <FormControlLabel
                            onClick={onRadioPriceChange}
                            key={item.value}
                            value={item.value}
                            control={<Radio />}
                            label={item.label}
                          />
                        ))}
                      </RadioGroup>
                    </div>
                  </Stack>
                </Scrollbar>

                <Box sx={{ p: 3 }}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    color="inherit"
                    variant="outlined"
                    onClick={onResetFilter}
                    startIcon={<Iconify icon="ic:round-clear-all" />}
                  >
                    Clear All
                  </Button>
                </Box>
              </Drawer>
            </Form>
          </FormikProvider>
        </RootStyle>
      )}
    </RootStyle>
  );
}
