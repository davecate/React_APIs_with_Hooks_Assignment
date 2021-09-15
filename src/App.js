import React, { useState } from "react"
import "./App.css"

import AlbumList from "./AlbumList"
import UserList from "./UserList"

const App = () => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [albums, setAlbums] = useState([])

  // Display user list and album list
  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} currentUser={currentUser} />
      </div>
      <div className="right column">
        <AlbumList currentUser={currentUser} albums={albums} setAlbums={setAlbums} />
      </div>
    </div>
  )
}

export default App
