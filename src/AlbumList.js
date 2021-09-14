import React from "react"

const AlbumList = ({ albums }) => {

  if (albums.length > 0) {
    return (
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id}>
            {album.id} — {album.title}
          </li>
        ))}
      </ul>
      )
  } else return <p>Please click on a user name to the left</p>
}

export default AlbumList
