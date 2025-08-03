import React, { useState } from 'react';

const SongList = ({ Songs }) => {
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlay = (index) => {
    setPlayingIndex(index);
  };

  const handlePause = () => {
    setPlayingIndex(null);
  };

  return (
    <div className='mood-songs flex flex-col items-center mt-10 gap-5'>
      <h2>Recommended Songs</h2>
      {Songs.map((song, index) => (
        <div key={index} className='song-item flex justify-between items-center w-[30rem] p-4 bg-gray-100 text-black rounded-lg shadow-md hover:bg-gray-200 transition-colors'>
          <div className="title">
            <h2 className='text-2xl'>{song.title}</h2>
            <h3>{song.artist}</h3>
          </div>
          <div className="play-pause-button flex items-center gap-2">
            {playingIndex === index ? (
              <>
                <button onClick={handlePause}>
                  <i className="ri-pause-fill"></i>
                </button>
                <audio
                  src={song.audio || song.url}
                  autoPlay
                  controls
                  onEnded={handlePause}
                  style={{ display: 'none' }}
                />
              </>
            ) : (
              <button onClick={() => handlePlay(index)}>
                <i className="ri-play-fill"></i>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
