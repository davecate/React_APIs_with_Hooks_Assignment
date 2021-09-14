import React from "react"

const AlbumList = ({ albums }) => {


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
