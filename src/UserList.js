import React from "react"

const UserList = ({ users, setCurrentUser }) => {
  // Displays list of users
  return (
    <ul className="user-list">
      {/* Map thru users array and return a button for each, 
      with the user's name and id attached */}
      {users.map((user) => (
        <li key={user.id}>
          <button type="button" onClick={() => setCurrentUser(user)}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default UserList
