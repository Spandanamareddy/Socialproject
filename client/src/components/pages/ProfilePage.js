import '../../App.css';
import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../../Context/userContext.js";

const Profile = (props) => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        PostId: '',
        content: '',
        timestamp: ''
    });

    const { PostId, content, timestamp } = post;

    const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submitted');
        const UserId = location.state.name;
        fetchData("/post/create",
            {
                UserId,
                PostId,
                content,
                timestamp
            },
            "POST")
            .then((data) => {
                if (!data.message) {
                    console.log(data)
                    fetchData("/post/viewpost",
                        {
                            UserId
                        },
                        "POST")
                        .then((info) => {
                            console.log(info);
                            if (!info.message) {
                                setPost({PostId: '',
                                content: '',
                                timestamp: ''
                                });
                                navigate("/profile", { state: { name: UserId, data: info } });
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const deletePost = (e) => {
        var pid = e.target.value;
        var UserId = user.UserId;
        console.log(e.target.value);
        fetchData("/post/delete",
          {
            pid
          },
          "DELETE")
          .then((data) => {
            if (!data.message) {
                console.log(data)
                fetchData("/post/viewpost",
                    {
                        UserId
                    },
                    "POST")
                    .then((info) => {
                        console.log(info);
                        if (!info.message) {
                            navigate("/profile", { state: { name: UserId, data: info } });
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }

    let posts = [];

    for (let i = 0; i < Object.keys(location.state.data).length; i++) {
        posts.push({ _id: location.state.data[i]._id, PostId: location.state.data[i].PostId, content: location.state.data[i].content, timestamp: location.state.data[i].timestamp });
    }

    return (
        <div className="container mt-5 login">
            <h1 className="h1-main text-dark">{location.state.name}</h1>
            <h2>Your Posts</h2> <br />


            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">PostId</th>
                        <th scope="col">Content</th>
                        <th scope="col">Timestamp</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(cont => (
                        <tr>
                            <th scope="row">{cont.PostId}</th>
                            <td>{cont.content}</td>
                            <td>{cont.timestamp}</td>
                            <td><button className="btn btn-dark btn-left" id="delete-post" name="delete-post" value={cont._id} onClick={deletePost}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table><br /><br />

            <div className="container ">
                <div className="row m-4">
                    <div className="col-md-6 col-sm-12 bg-custom none">
                        <h1 className="text-center pt-3">Post</h1>
                    </div>
                    <div className="col-md-6 col-sm-12 bg-custom-form">

                        <form className="p-3" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="PostId">PostId</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='PostId'
                                    id='PostId'
                                    onChange={onChange}
                                    value={PostId}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">content</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name='content'
                                    id='content'
                                    onChange={onChange}
                                    value={content}
                                    required>
                                </textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="timestamp">timestamp</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="timestamp"
                                    name='timestamp'
                                    onChange={onChange}
                                    value={timestamp}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-custom mb-3 mt-3">
                                Post
        </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;