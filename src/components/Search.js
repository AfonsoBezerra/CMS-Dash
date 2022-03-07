import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { TextField, InputAdornment, Toolbar, OutlinedInput } from '@mui/material';
// component
import Iconify from './Iconify';

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

// const RootStyle = styled('div')(({ theme }) => ({
//   '& .MuiOutlinedInput-root': {
//     width: 200,
//     height: 60,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.easeInOut,
//       duration: theme.transitions.duration.shorter
//     }),
//     '&.Mui-focused': {
//       width: 260,
//       boxShadow: theme.customShadows.z12
//     }
//   }
// }));

// ----------------------------------------------------------------------

Search.propTypes = {
  onChangeFunc: PropTypes.func
};

export default function Search({ onChangeFunc }) {
  return (
    <RootStyle>
      <SearchStyle
        placeholder="Search post..."
        onChange={onChangeFunc}
        InputProps={{
          startAdornment: (
            <InputAdornment style={{ marginRight: '1rem', height: '20px' }}>
              <Iconify
                icon="eva:search-fill"
                sx={{
                  ml: 1,
                  width: 20,
                  height: 20,
                  color: 'text.disabled'
                }}
              />
            </InputAdornment>
          )
        }}
      />
    </RootStyle>
  );
}
