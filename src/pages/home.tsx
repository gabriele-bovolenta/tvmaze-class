/* import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/firebase-config"; */

const Home = () => {

    /* const [postList, setPostList] = useState<any>([]);
    const postCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            console.log(data);

            setPostList(data.docs.map((doc) => (
                { ...doc.data(), id: doc.id }
            )));
        }

        getPosts();
        console.log(postList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deletePost = async (id: any) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    } */

    return (
        <div className='homePage'>
            {/* {postList.map((post: any, i: number) => {
                return (
                    <div className='post' key={i}>
                        <div className='postHeader'>
                            <div className='title'>
                                <h1>{post.title}</h1>
                            </div>
                            <div className='deletePost'>
                                <button onClick={() => { deletePost(post.id) }}>&#128465;</button>
                            </div>
                        </div>
                        <div className='postTextContainer'>
                            {post.postText}
                            {!!post.author.name ? <h3>@{post.author.name}</h3> : <h3>no author</h3>}
                        </div>
                    </div>
                )
            })} */}
        </div>
    )
}

export default Home;