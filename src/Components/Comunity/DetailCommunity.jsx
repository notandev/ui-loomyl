import { useParams } from "react-router-dom";
import Footer from "../Ui/Footer";
import Navbar from "../Ui/Navbar";
import { useEffect, useState, useCallback } from "react";
import { getComunityById } from "../../api/comunity";
import { createComment, deleteComment, getCommentByCommunityId } from "../../api/comment";
import { useAuth } from "../../state/AuthProvider";
import { getImageByUserId } from "../../api/image";
import axios from "axios";

const DetailCommunity = () => {
    const { id } = useParams();
    const [comunity, setComunity] = useState([]);
    const [comment, setComment] = useState([]);
    const [content, setContent] = useState("");
    const { user } = useAuth();
    const userId = user.id;
    const [username, setUsername] = useState("");
    const [imageOwner, setImageOwner] = useState(null);
    const [profileImages, setProfileImages] = useState({});
    const [profileImageComment, setProfileImageComment] = useState({});

    console.log('image',imageOwner);
    const getDetailComunity = useCallback(() => {
        getComunityById(id).then((res) => {
            setComunity(res.data);
            setUsername(res.data[0].user.username);
            res.data.forEach(async (data) => {
                const imageUrl = await fetchProfileImage(data.user.id);
                setProfileImages(prevImages => ({ ...prevImages, [data.user.id]: imageUrl }));
            });
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);

    const fetchProfileImage = async (userId) => {
        try {
            const response = await getImageByUserId(userId);
            const imageUrl = response[0].url;
            return `https://api.ahmadjumhadi.my.id/uploads/${imageUrl}`;
        } catch (error) {
            console.error("Error fetching profile image:", error);
            return null;
        }
    };

    const getComment = useCallback(() => {
        getCommentByCommunityId(id).then((res) => {
            setComment(res.data.data);
            console.log(res.data.data[0].user_id);
            res.data.data.forEach(async (data) => {
                console.log('user_id', data.user_id);
                const image = await getImageByUserId(data.user_id);
                if (image.length === 0) {
                    return null
                }
                const imageFileName = image[0].url;
                const imageUrl = `https://api.ahmadjumhadi.my.id/uploads/${imageFileName}`;
                setProfileImageComment(prevImages => ({ ...prevImages, [data.user_id]: imageUrl }));
            });
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);

    const getProfileImage = useCallback(() => {
        getImageByUserId(userId).then((res) => {
            const imageFileName = res[0].url;
            const imageUrl = `https://api.ahmadjumhadi.my.id/uploads/${imageFileName}`;
            setImageOwner(imageUrl);
        }).catch((err) => {
            console.log(err);
        });
    },[userId])

    useEffect(() => {
        getDetailComunity();
        getComment();
        getProfileImage();
    }, [getDetailComunity, getComment, getProfileImage]);

    const handlePostComment = () => {
        const payload = {
            content,
            comunity_id: id
        };
        createComment(payload).then((response) => {
            getComment();
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleDeleteComment = (commentId) => {
        deleteComment(commentId).then(() => {
            getComment();
        }).catch((error) => {
            console.log(error);
        });
    };

    const parseTags = (content) => {
        const parts = content.split(/(#\w+)/g);
        return parts.map((part, index) =>
            part.startsWith('#') ? <span key={index} className="text-blue-500 cursor-pointer">{part}</span> : part
        );
    };
    
    
    return (
        <>
            <Navbar />
            <div className="bg-comunity-page w-full bg-cover md:pt-36 grid place-items-center pb-40">
                {comunity.length === 0 ? <div>No Community Post</div> : comunity.map((data, i) => (
                    <div key={data.id} className="bg-white h-full shadow-sm shadow-gray-500 w-full md:w-1/2 grid place-items-center rounded overflow-auto p-7">
                        <div className="w-full">
                            <div className="flex gap-x-5 pb-2">
                                {profileImages[data.user.id] ? (
                                    <img className="h-16 w-16 bg-gray-100 rounded-xl" src={profileImages[data.user.id]} alt="Profile" />
                                ) : (
                                    <div className="h-16 w-16 bg-gray-100 rounded-xl"></div>
                                )}
                                {/* <img className="w-10 h-10 bg-black rounded-full" src={profileImages[data.user.id]} alt="Profile" /> */}
                                <div className="flex flex-col justify-evenly text-left">
                                    <p className="font-bold text-lg">{username}</p>
                                    <p className="text-sm">1 Second Ago</p>
                                </div>
                            </div>
                            <div className="text-left my-3">
                                {parseTags(data.content)}
                            </div>
                            <hr />
                            <p className="py-2">{comment.length} komentar</p>
                            <div className="flex pb-4">
                            {imageOwner ? (
                                    <img className="h-10 w-10 mr-3 bg-gray-100 rounded-xl" src={imageOwner} alt="Profile" />
                                ) : (
                                    <div className="h-10 w-10 mr-3 bg-gray-100 rounded-xl"></div>
                                )}
                                <input type="text" className="w-full h-10 border border-gray-300 rounded-md px-3" placeholder="Comment" value={content} onChange={(e) => setContent(e.target.value)} />
                                <button className="bg-[#8FC1FF] text-white py-2 px-3 ml-3 rounded-xl" onClick={handlePostComment}>Kirim</button>
                            </div>
                            {comment.map((commentData) => (
                                <div key={commentData.id}>
                                <div  className="py-2 flex justify-between bg-white">
                                    <div className="flex flex-col justify-start">
                                        <div className="flex items-center">
                                            {profileImageComment[commentData.user_id] ? (
                                                <img className="h-8 w-8 bg-gray-100 rounded-xl" src={profileImageComment[commentData.user_id]} alt="Profile" />
                                            ) : (
                                                <div className="h-8 w-8 bg-gray-100 rounded-xl"></div>
                                            )}

                                            <h5 className="font-bold text-sm pl-3">{commentData.username}</h5>
                                        </div>
                                        <div className="flex pt-1">
                                        <div className="h-2 w-8 bg-white rounded-xl"></div>
                                            <p className="pl-3">{commentData.content}</p>
                                        </div>
                                    </div>
                                    {commentData.user_id === userId && <button className="bg-[#ED4141] h-10 text-white py-1 px-3 rounded-xl" onClick={() => handleDeleteComment(commentData.id)}>Hapus</button>}
                                </div>
                                <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default DetailCommunity;
