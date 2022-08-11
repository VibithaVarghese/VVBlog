import { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "./BlogContext";
import Map from "./Map";

const Blog = () => {

    const { state: {blogData}} = useContext(BlogContext);

    return (
        <div>
            {blogData.map((indBlogData) => {
                let lat_long = indBlogData.lat_long;
                let newArray = lat_long.split(", ");
                let lat = parseFloat(newArray[0]);
                let lng = parseFloat(newArray[1]);
                return (
                    <>
                        <p>{indBlogData.title}</p>
                        <p>{indBlogData.body}</p>
                        <p>{indBlogData.reference}</p>
                        <a href={indBlogData.reference}>Reference</a>                       
                        <Map lat={lat} lng={lng}></Map>
                    </>
                )
            })}
        </div>
    )
}

export default Blog;