import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort } from '../sections/@dashboard/blog';
import BlogPostsSearch from '../components/Search';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Blog() {
  const [Posts, setPosts] = useState(POSTS);
  const [selectValue, setSelectValue] = useState('latest');

  function filterPostsInBlog(event) {
    const filterKey = event.target.value;
    const filteredPosts = POSTS.filter((post) =>
      post.title.toLocaleLowerCase().includes(filterKey.toLocaleLowerCase())
    );
    setPosts(filteredPosts);
  }

  return (
    <Page title="DashBoard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch onChangeFunc={(ev) => filterPostsInBlog(ev)} searchFor="post" />
          <BlogPostsSort
            options={SORT_OPTIONS}
            onSort={(ev) => setSelectValue(ev.target.value)}
            value={selectValue}
          />
        </Stack>

        <Grid container spacing={3}>
          {Posts.sort((a, b) => {
            if (selectValue === 'popular') {
              return b.view - a.view;
            }
            if (selectValue === 'oldest') {
              return a.createdAt - b.createdAt;
            }

            return b.createdAt - a.createdAt;
          }).map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
