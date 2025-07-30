import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceExpression = () => {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState('');
  const [emoji, setEmoji] = useState('😐');
  const [topMood, setTopMood] = useState('');

  const emojiMap = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
    fearful: '😱',
    disgusted: '🤢',
    neutral: '😐',
  };

  // Load models once on mount
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // public/models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
    };

    loadModels().then(startVideo);
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Webcam error:', err));
  };

  const handleDetect = async () => {
    if (!videoRef.current) return;

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detection) {
      const sorted = Object.entries(detection.expressions).sort((a, b) => b[1] - a[1]);
      const topExpression = sorted[0][0];
      const confidence = sorted[0][1];

      if (confidence > 0.6) {
        setExpression(topExpression);
        setEmoji(emojiMap[topExpression] || '❓');
        setTopMood(topExpression);
        console.log('Detected Mood:', topExpression);
      } else {
        setExpression('Unclear');
        setEmoji('❓');
        console.log('Mood unclear');
      }
    } else {
      setExpression('No face');
      setEmoji('❓');
      console.log('No face detected');
    }
  };

  return (
    <div className="relative flex flex-col mt-20 items-center">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
         
          className="rounded-lg w-[30rem] object-cover "
        />
        {/* Canvas removed for cleaner view */}
      </div>
      <div className="mt-4 text-2xl font-semibold">
        {emoji} Current Expression: {expression || 'Click Detect'}
      </div>
      <button
        onClick={handleDetect}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Detect Mood
      </button>
      <div className="mt-2 text-lg">
        Playing: <strong>{topMood} Songs</strong>
      </div>
    </div>
  );
};

export default FaceExpression;


