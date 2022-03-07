// material
import { Box, Grid, Container, Typography } from '@mui/material';
// import { BlogPostCard } from '../sections/@dashboard/blog';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppTraffic,
  AppWebsiteVisits,
  AppConversionRates,
  AppCurrentBlog,
  AppSales
} from '../sections/@dashboard/app';
//
// import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hello, welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppSales />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTraffic />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentBlog />
          </Grid>

          <Grid item xs={12} md={6} lg={8} />
        </Grid>
      </Container>
    </Page>
  );
}
