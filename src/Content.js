import { Container, Col, Row} from "react-bootstrap";
import Post from "./Post";
import {getPosts} from "./reddit";
import React from 'react'

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = {posts:[], showPosts:null};
    }

    componentDidMount() {
        getPosts("photoshopbattles", "hot", 50).then((result => {this.setState({posts: result})}));
        
        console.log(this.state.posts);
    }

    render() {
        var lines = this.state.posts.map((post) => {return (<Post post={post} />);})
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

export default Content;