import React, { useEffect, useState } from "react"
import "./App.css"

import AlbumList from "./AlbumList"
import UserList from "./UserList"

const usersUrl = "https://jsonplaceholder.typicode.com/users"
const albumUrl = "https://jsonplaceholder.typicode.com/albums?userId="

const App = () => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [albums, setAlbums] = useState([])

  useEffect(() => {

    const abortController = new AbortController()

    const originalTitle = document.title
    document.title = "Awesome Album App"

    const loadUsers = async () => {

      try {
        const getUsers = await fetch(usersUrl, { signal: abortController.signal })
        const usersData = await getUsers.json()

        setUsers(usersData)

      } catch (error) {
          if (error.name === "AbortError") {console.log("Aborted")}
          else throw error
      }

    }

    loadUsers()

    
    return () => {
      abortController.abort()
      document.title = originalTitle
    }

  }, [])

  useEffect(() => {

    if (!currentUser.id) return

    const abortController = new AbortController()

    const loadAlbums = async () => {

      try {
        const getAlbums = await fetch(`${albumUrl}${currentUser.id}`, { signal: abortController.signal })
        const albumsData = await getAlbums.json()

        setAlbums(albumsData)

      } catch (error) {
          if (error.name === "AbortError") {console.log("Aborted")}
          else throw error
      }

    }

    loadAlbums()

    return () => abortController.abort()

  }, [currentUser])

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} currentUser={currentUser} />
      </div>
      <div className="right column">
        <AlbumList albums={albums} />
      </div>
    </div>
  )
}

export default App
