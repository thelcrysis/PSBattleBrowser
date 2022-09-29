const axios = require('axios')

class RedditPost {
    constructor(id_, title, author, imageUrl, score){
        this.id_ = id_;
        this.title = title;
        this.author = author;
        this.imageUrl = imageUrl;
        this.score = score;
    }
}

async function getPosts(subreddit, type, limit=100, verbose = false){
    try {
        var allPosts = [];
        const params = type == "top" ? {limit:limit, t:"all"} : {limit:limit};
        const posts = await axios.get(`https://www.reddit.com/r/${subreddit}/${type}/.json`, {params: params});

        const numberOfPosts = posts.data.data.children.length
        for (var i=0; i<numberOfPosts; i++){
            var current_post = posts.data.data.children[i].data;
            
            var id_ = current_post.id;
            var title = current_post.title;
            var author = current_post.author;
            var imageUrl = current_post.url;
            if (!imageUrl.includes("i.redd.it")){
                // doesnt contain an image -> meta or some sh
                continue;
            }
            var score = current_post.score;
            allPosts.push(new RedditPost(id_, title, author, imageUrl, score));
            if (verbose) {
                console.log(`https://www.reddit.com/r/${subreddit}/${type}/.json`);
                console.log(`${id_} | ${title} | ${author} | ${imageUrl} | ${score}`);
            }
        }
        return allPosts;

    } catch(err){
        console.log({message : err})
    }
}

// getPosts("photoshopbattles", "top", 100, true).then(result => {console.log(result.length)})

class RedditComments {
    constructor(body, imgUrl, author, ups){
        this.body = body;
        this.imgUrl = imgUrl;
        this.author = author;
        this.ups = ups;
    }
}

async function getComments(postId, verbose = false){

    const extractImgurDirectURL = (url) => {
        // from http://imgur.com/ZBiMnIW to http://i.imgur.com/ZBiMnIW.jpeg
        var after_http = url.substring(url.indexOf("://")+"://".length,url.length);
        return `http://i.${after_http}.jpeg`
    }

    var allComments = [];
    try {
        const comments = await axios.get(`https://www.reddit.com/r/photoshopbattles/comments/${postId}/.json`, {params : {sort: "top"}});
        const numberOfComments = comments.data[1].data.children.length;
        for (var i=0; i<numberOfComments; i++){
            var current_comment = comments.data[1].data.children[i]
            if (current_comment.kind == "more"){
                continue;
            }
            var body = current_comment.data.body;
            var htmlBody = current_comment.data.body_html;
            var author = current_comment.data.author;
            var ups = current_comment.data.ups;

            // Filtering imgur image url from htmlBody (located by using href tag)
            var after_href = htmlBody.substring(htmlBody.indexOf('href="')+'href="'.length, htmlBody.length);
            var imgUrl = after_href.substring(0, after_href.indexOf('"'))
            if (!imgUrl.includes("imgur") || imgUrl.includes("/a/")){
                // All non-imgur or not direct imgur images are skipped.
                continue;
            }
            // removing reddit url syntax i.e. [text](url) and url itself - might not always work, idc ngl
            body = body.replace(/[\[\]\(\)]+/g, '');
            body = body.replace(imgUrl,'')
            // strip new lines
            body = body.replace(/[\n\r]/g, '');
            if (!imgUrl.includes("//i.")){
                imgUrl = extractImgurDirectURL(imgUrl);
            }
            allComments.push(new RedditComments(body, imgUrl, author, ups));
            if (verbose) {
                console.log(`[${body}] | [${imgUrl}] | ${author} | ${ups}`);
            }
        }
        return allComments;
    } catch(err) {
        console.log({message : err});
    }
}

// getComments("69xknh");

export {RedditPost, RedditComments, getComments, getPosts};