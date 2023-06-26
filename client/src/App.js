import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, AppBar, Toolbar, Grow, Grid, Button, InputBase } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import memories from './images/memories.png';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'white',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.2),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  button: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  image: {
    height: '60px',
  },
}));

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleCreatePost = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <img className={classes.image} src={memories} alt="Memories" />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={handleCreatePost}
            >
              Create Post
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Grow in>
        <Container maxWidth="lg">
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts posts={filteredPosts} setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              {showForm ? (
                <Form currentId={currentId} setCurrentId={setCurrentId} handleCloseForm={handleCloseForm} />
              ) : null}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default App;
