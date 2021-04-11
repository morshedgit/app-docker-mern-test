import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl,InputLabel,Input,FormHelperText,Grid,Button, colors, Typography  } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '50px'

  },
  full:{
    width:'100%'
  },
  mybox: {
    backgroundColor: colors.grey[100],
  },
  control: {
    padding: theme.spacing(2),
  },
}));


function App() {
  const [spacing, setSpacing] = React.useState(6);

  const classes = useStyles();

  const [posts, setPosts] = useState({ data: [] });
  const [post, setPost] = useState({title:'',body:'',author:'Sadeq'});


  useEffect(() => {
    console.log('On mount')
    fetchPosts()
  }, [])

  const addPost = async () => {
    try {
      const res = await fetch('http://localhost:9000/posts',{
        method: 'POST',
        body: JSON.stringify(post), // body data type must match "Content-Type" header
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      const data = await res.json()
      console.log(data);
      fetchPosts()
    } catch (e) {
      console.log(e)
    }
  }
  const deletePost = async (id) => {
    try {
      const res = await fetch(`http://localhost:9000/posts/${id}`,{
        method: 'DELETE',
        body: JSON.stringify(post), // body data type must match "Content-Type" header
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      const data = await res.json()
      console.log(data);
      fetchPosts()
    } catch (e) {
      console.log(e)
    }
  }
  const updatePost = async (id) => {
    try {
      const res = await fetch(`http://localhost:9000/posts/${id}`,{
        method: 'PATCH',
        body: JSON.stringify(post), // body data type must match "Content-Type" header
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      const data = await res.json()
      console.log(data);
      fetchPosts()
    } catch (e) {
      console.log(e)
    }
  }
  const fetchPosts = async () => {

    try {
      const res = await fetch('http://localhost:9000/posts', {
        method: 'GET'
      })
      const data = await res.json()
      setPosts(data)
    } catch (e) {
      console.log(e)
    }
  }
  const fetchPost = async (id) => {

    try {
      const res = await fetch(`http://localhost:9000/posts/${id}`, {
        method: 'GET'
      })
      const data = await res.json()
      console.log(data)
      setPost(data.data)
    } catch (e) {
      console.log(e)
    }
  }
  const handlePostChange = (e,field) => {
    switch(field){
      case 'title':
        setPost({...post,title:e.target.value})
        break
      case 'body':
        setPost({...post,body:e.target.value})
        break
      case 'author':
        setPost({...post,author:e.target.value})
        break
    }
  }

  return (
    <div className="App">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid className={classes.mybox} item xs={2} sm={3}>

              <Typography variant="h4">Post List</Typography>

              {posts.data.map(post => {
                return (
                  <Button className={classes.full} key={post._id} onClick={()=>fetchPost(post._id)}>{post.title}</Button>
                )
              })}

            </Grid>

            <Grid className={classes.mybox} item xs={10} sm={9}>

            <Typography variant="h4">Post </Typography>

              <form  noValidate autoComplete="off">
                <FormControl>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <Input id="title" aria-describedby="title" value={post.title} onChange={(e)=>handlePostChange(e,'title')} />
                  <FormHelperText id="title">Give a unique title</FormHelperText>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="body">Body</InputLabel>
                  <Input id="body" aria-describedby="body" value={post.body} onChange={(e)=>handlePostChange(e,'body')} />
                  <FormHelperText id="body">What you have in mind</FormHelperText>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="author">Author</InputLabel>
                  <Input id="author" aria-describedby="author" value={post.author} onChange={(e)=>handlePostChange(e,'author')} />
                  <FormHelperText id="title">Who are you</FormHelperText>
                </FormControl>

                <Button onClick={addPost}>Create Post</Button>               
                <Button disabled={!post._id} onClick={()=>updatePost(post._id)}>Update Post</Button>               
                <Button variant="contained" color="secondary" disabled={!post._id} onClick={()=>deletePost(post._id)}>Delete Post</Button>               

              </form>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
