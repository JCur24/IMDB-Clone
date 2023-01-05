import React, {useEffect, useState} from "react";
import {findUsersByAdmin, userProfile} from "../../services/userService";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteInteraction,
    getInteractionsByUser
} from "../../services/interactionService";
import {Link} from "react-router-dom";
const selectUser = (state) => state.user;

const CommentItem = (data) => {
    const interaction = data.data.interaction;
    const initialUser = useSelector(selectUser);
    const dispatch = useDispatch();

    const [adminUsers, setAdminUsers] = useState([]);

    const [user, setUser] = useState(initialUser);
    const getProfile = () => userProfile(setUser, dispatch).then((e) => {
        if(user.role === 'ADMIN') {
            findUsersByAdmin(user._id, setAdminUsers)
        }
    })

    useEffect(getProfile, []);

    const clickDelete = () => {
        deleteInteraction(interaction, data.data.setInteractions)
    }

    return (
        <li className="list-group-item">
            <div className="ps-3" style={{width: '100%'}}>
                { user && user.role === 'ADMIN' && adminUsers.find(usr => usr._id === interaction.userId) &&
                    <i onClick={clickDelete} className="fas fa-times fa-pull-right"> </i> }
                <Link to={`/profile/${interaction.userId}`} className={"text-decoration-none"}>@{interaction.username}</Link>
                    <div className="text-secondary text-decoration-none">
                        {interaction.review}
                    </div>

            </div>
        </li>
    );
};


export default CommentItem;