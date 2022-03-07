import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { useTheme, styled } from '@mui/material/styles';
import { BaseOptionChart } from '../../../components/charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Sales',
    type: 'column',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 50]
  },
  {
    name: 'Canceled',
    type: 'area',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 5]
  }
];

export default function AppWebSales() {
  const theme = useTheme();
  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.main, theme.palette.error.main],
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2022',
      '02/01/2022',
      '03/01/2022',
      '04/01/2022',
      '05/01/2022',
      '06/01/2022',
      '07/01/2022',
      '08/01/2022',
      '09/01/2022',
      '10/01/2022',
      '11/01/2022',
      '12/01/2022'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} Sales`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Sales per Month " subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={405} />
      </Box>
    </Card>
  );
}
