import React from "react";

function UserItem(props) {
  const { user } = props

  return (
    <div className="card text-center">
      <img
        src={user.avatar_url}
        className="round-img"
        alt="round img"
        style={{ width: "60px" }}
      />
      <div>
        <h5>{user.login}</h5>
        <a href={user.html_url} className="btn btn-dark btn-sm my-1">
          More...
        </a>
      </div>
    </div>
  );
}

export default UserItem;
