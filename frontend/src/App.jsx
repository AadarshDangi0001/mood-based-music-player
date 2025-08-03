import React, { useState } from 'react'
import FaceExpression from './components/FaceExpression'
import SongList from './components/SongList'


const App = () => {
 
    const [songs, setSongs] = useState([
          {
              title:"test_title",
              artist:"test_artist",
              url:"https://example.com/song.mp3",
          },
            {
              title:"test_title",
              artist:"test_artist",
              url:"https://example.com/song.mp3",
          },
            {
              title:"test_title",
              artist:"test_artist",
              url:"https://example.com/song.mp3",
          }
      ]);


  return (
    <div>
    <FaceExpression setSongs = {setSongs}/>
    <SongList Songs={songs} />
    </div>
  )
}

export default App
