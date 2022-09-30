import { Container, Col, Row} from "react-bootstrap";
import Post from "./Post";
import {getComments, getPosts} from "./reddit";
import React from 'react'
import withRouter from "./withRouter";
class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = {posts:[]};
    }

    componentDidMount() {
        if (this.props.type == "post"){
            getPosts("photoshopbattles", this.props.typeOfPosts, 30).then((result => {this.setState({posts: result})}));
        }
        if (this.props.type == "comment"){
            var postId = this.props.params.id
            console.log('here')
            getComments(postId).then((result => {this.setState({posts: result})}))

        }
    }

    render() {
        var lines = null;
        var originalImage = null;
        if (this.props.type == "post"){
            lines = this.state.posts.map((post) => {return (<Post type="post" post={post} />);})
        } else if (this.props.type == "comment"){
            lines = this.state.posts.map((post) => {return (<Post type="comment" post={post} />);})
        }
        return (
            <Container>
                <Row md="auto">
                    <Col xs={2} sm={2} md={4}></Col>
                    <Col xs={10} sm={10} md={4}>
                        <center>{lines}</center>
                    </Col>
                    <Col xs={2} sm={2} md={4}></Col>
                </Row>
            </Container>  
        )    
    };
}

export default withRouter(Content);