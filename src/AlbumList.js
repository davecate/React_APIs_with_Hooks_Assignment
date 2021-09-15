import React, { useEffect } from "react"

const albumUrl = "https://jsonplaceholder.typicode.com/albums?userId="

const AlbumList = ({ currentUser, albums, setAlbums }) => {

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

  }, [setAlbums, currentUser])

  // Conditional: if list of albums is empty, return an introductory message.
  if (albums.length > 0) {
    // Otherwise, display the current user's album list
    return (
      <ul className="album-list">
        {/* Map thru album array and return an unordered list of "id" and "title" values */}
        {albums.map((album) => (
          <li key={album.id}>
            {album.id} — {album.title}
          </li>
        ))}
      </ul>
      )
      // Intro message
  } else return <p>Please click on a user name to the left</p>
}

export default AlbumList
