import React from 'react';
import Card from 'react-bootstrap/Card';

class Post extends React.Component {
    constructor(props){
      super(props)
      console.log(props)
    }

    render() {
      var post = this.props.post;
      return (
        <>
          <Card>
            <Card.Body>
              <Card.Text>
              <i>{post.title}</i> <div>by {post.author} (<div style={{ color: 'red', display:'inline'}}>{post.score}</div> updoots)</div>
              </Card.Text>
            </Card.Body>
            <a href={'https://www.reddit.com/r/photoshopbattles/comments/' + post.id_}>
              <Card.Img variant="bottom" src={post.imageUrl} />
            </a>
          </Card>
        <br></br>
      </>
    );
  }
}
export default Post;