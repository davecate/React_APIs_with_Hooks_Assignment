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

  // Users hook: loads users list
  useEffect(() => {

    // Abort controller to cancel data requests whenever necessary
    const abortController = new AbortController()

    // Store original document title for later
    const originalTitle = document.title
    document.title = "Awesome Album App"

    // Loading function
    const loadUsers = async () => {

      try {
        // API request for users data: fetches an array of user objects
        const getUsers = await fetch(usersUrl, { signal: abortController.signal })
        const usersData = await getUsers.json()

        // Update users state with users data
        setUsers(usersData)

      } catch (error) {
          if (error.name === "AbortError") {console.log("Aborted")}
          else throw error
      }

    }

    // Call loading function
    loadUsers()

    // Cleanup: aborts unfinished API requests & restores original document title
    return () => {
      abortController.abort()
      document.title = originalTitle
    }

  }, [])

  // Albums hook: loads albums
  useEffect(() => {

    // Conditional: if current user state doesn't contain an id key, exit this hook
    if (!currentUser.id) return

    // Abort controller to cancel data requests whenever necessary
    const abortController = new AbortController()

    // Loading function
    const loadAlbums = async () => {

      try {
        // API request for albums data: takes in a the id key/value from current user state
        // and fetches an array of album objects
        const getAlbums = await fetch(`${albumUrl}${currentUser.id}`, { signal: abortController.signal })
        const albumsData = await getAlbums.json()

        // update albums state with user's album list
        setAlbums(albumsData)

      } catch (error) {
          if (error.name === "AbortError") {console.log("Aborted")}
          else throw error
      }

    }

    // Call loading function
    loadAlbums()

    // Cleanup: aborts unfinished API requests
    return () => abortController.abort()

  }, [currentUser])

  // Display user list and album list
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
