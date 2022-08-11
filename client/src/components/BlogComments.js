import { useContext } from "react";
import { BlogContext } from "./BlogContext";

const BlogComments = () => {

    const { state: { blogComments }, actions:{handleCommentPost}} = useContext(BlogContext);


    return (
        <>
            <div>
                { blogComments.map((indBlogComments) => {
                    return (
                        <>
                            <p>{indBlogComments.id}</p>
                            <p>{indBlogComments.name}</p>
                            <p>{indBlogComments.date}</p>
                            <p>{indBlogComments.replyName}</p>
                            <p>{indBlogComments.reply}</p>
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
            </div>
        </>
    )
}

export default BlogComments;