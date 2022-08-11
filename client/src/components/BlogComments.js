import { useContext } from "react";
import { BlogContext } from "./BlogContext";

const BlogComments = () => {

    const { state: { loggedIn, blogComments }, actions:{handleCommentPost, handlePostSubmit, handleReplyClick, handleDeleteClick}} = useContext(BlogContext);


    return (
        <>
            <div>
                { blogComments.map((indBlogComments) => {
                    return (
                        <>
                            <p>{indBlogComments.id}</p>
                            <p>{indBlogComments.name}</p>
                            <p>{indBlogComments.date}</p>
                            <p>{indBlogComments.comment}</p>
                            <p>{indBlogComments.replyName}</p>
                            <p>{indBlogComments.reply}</p>
                            {loggedIn && <input type="button" value="reply" onClick={(ev) => handleReplyClick(ev.target.value, indBlogComments.id)}></input>}
                            {loggedIn && <input type="button" value="delete" onClick={(ev) => handleDeleteClick(ev.target.value, indBlogComments.id)}></input>}
                        </>
                    )
                })} 
            </div>
            <div>
                <label>Enter value : </label>
                <input type="textarea" 
                name="textValue"
                onChange={(ev) => handleCommentPost(ev.target.value, "comment")}
                />
                <label>name: </label>
                <input type="text" name="name" onChange={(ev) => handleCommentPost(ev.target.value, "name")}></input>
                <input type="submit" value="Submit" onClick={handlePostSubmit}></input>
            </div>
        </>
    )
}

export default BlogComments;