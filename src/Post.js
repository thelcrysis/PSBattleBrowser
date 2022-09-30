import React from 'react';
import Card from 'react-bootstrap/Card';

class CardData{
  constructor(link, imgUrl, score, mainText, author){
    this.link = link;
    this.imgUrl = imgUrl;
    this.score = score;
    this.mainText = mainText;
    this.author = author;
  }
}
class Post extends React.Component {
    constructor(props){
      super(props)
    }

    render() {
      var cardData = null;
      var data = this.props.post;
      console.log(this.props.type)
      if (this.props.type == "post"){
        cardData = new CardData(
          '/comment/' + data.id_,
          data.imageUrl,
          data.score,
          data.title,
          data.author
        )
      } else if (this.props.type == "comment"){
        cardData = new CardData(
          data.imgUrl,
          data.imgUrl,
          data.ups,
          data.body,
          data.author
        )
      }
      
      return (
        <>
          <Card>
            <Card.Body>
              <Card.Text>
              <i>{cardData.mainText}</i> <div>by {cardData.author} (<div style={{ color: 'red', display:'inline'}}>{cardData.score}</div> updoots)</div>
              </Card.Text>
            </Card.Body>
            <a href={cardData.link}>
              <Card.Img variant="bottom" src={cardData.imgUrl} />
            </a>
          </Card>
        <br></br>
      </>
    );
  }
}
export default Post;