import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, IconButton, Menu, MenuItem } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setCurrentId(post._id);
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    handleClose();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card className={classes.card}>
      <div className={classes.titleDateContainer}>
        <Typography className={classes.title} variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography className={classes.date} variant="body2" color="textSecondary" component="p">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <CardMedia
        className={classes.media}
        image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
      </div>
      <div className={classes.overlay2}>
        <IconButton aria-controls="post-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreHorizIcon fontSize="default" />
        </IconButton>
        <Menu id="post-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleBookmark}>
            {isBookmarked ? (
              <BookmarkIcon fontSize="small" />
            ) : (
              <BookmarkBorderIcon fontSize="small" />
            )}
            {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
          </MenuItem>
        </Menu>
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <FavoriteIcon fontSize="small" /> Like {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
