import React, { useEffect } from "react"

const usersUrl = "https://jsonplaceholder.typicode.com/users"

const UserList = ({ users, setUsers, setCurrentUser }) => {

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


  // Displays list of users
  return (
    <ul className="user-list">
      {/* Map thru users array and return a list of buttons for each, 
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
