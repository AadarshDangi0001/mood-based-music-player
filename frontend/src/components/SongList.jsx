import React, { use, useState } from 'react'

const SongList = () => {
  
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
    <div className='mood-songs flex flex-col items-center mt-10 gap-5'>
        <h2>Recommended Songs</h2>
       
            {songs.map((song, index) => (
             <div key={index} className='song-item flex justify-between items-center w-[30rem] p-4 bg-gray-100 text-black rounded-lg shadow-md hover:bg-gray-200 transition-colors'>
                  <div className="title">
                    <h2 className='text-2xl'>{song.title}</h2>
                    <h3>{song.artist}</h3>
                  </div>
                  <div className="play-pause-button">
                     <i className="ri-play-fill"></i>
                     <i className="ri-pause-fill"></i>
                  </div>
             </div>
            ))}
        
      
    </div>
  )
}

export default SongList
