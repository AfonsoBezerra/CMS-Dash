import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
// material
import { Box, Card, Typography, Button, Divider, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
// utils
import { fDateTime } from '../../../utils/formatTime';
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: 'Order #37745 from September',
    time: faker.date.past(),
    type: 'order2'
  },
  {
    title: 'New order placed #XF-2356',
    time: faker.date.past(),
    type: 'order2'
  },
  {
    title: 'Bug in Cards',
    time: faker.date.past(),
    type: 'order3'
  },
  {
    title: 'New order placed #XF-2356',
    time: faker.date.past(),
    type: 'order2'
  },
  {
    title: 'New order placed #XF-2356',
    time: faker.date.past(),
    type: 'order3'
  }
];

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'order1' && 'success.main') ||
              (type === 'order2' && 'warning.main') ||
              (type === 'order3' && 'error.main')
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AppOrderTimeline() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Order TimeLine" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          component={RouterLink}
          to="/dashboard/ordertimeline"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
