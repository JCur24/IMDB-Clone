import {Link} from "react-router-dom";

const HomeUser = (data) => {
  const user = data.data;

  return (
      <Link to={`/profile/${user._id}`}
            className={"list-group-item list-group-item-action"}>
        <p><b>{user.firstName} {user.lastName}:</b> <span className={"text-secondary"}>@{user.username}</span></p>
      </Link>
  )
}

export default HomeUser;