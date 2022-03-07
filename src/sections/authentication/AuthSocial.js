// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  return (
    <>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <div
            className="google-btn"
            style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
          >
            {' '}
            <div className="google-icon-wrapper">
              {' '}
              <img
                alt="vetor"
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />{' '}
            </div>{' '}
            <p className="btn-text" style={{ color: '#222', textTransform: 'initial' }}>
              <b>Sign in with Google</b>
            </p>{' '}
          </div>
        </Button>
      </Stack>
    </>
  );
}
