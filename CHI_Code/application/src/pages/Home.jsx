/**
 * Home page
 * 
 * This is the main landing page for the application
 * 
 * @author Jake McCarthy
 */
import { useState, useEffect } from 'react';

function Home() {
  const [preview, setPreview] = useState([]);
  const [errors, setErrors] = useState([]);

  // Gets 1 video from API to preview
  const getPreview = () => {
      fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/preview?limit=1')
      .then( response => response.json() )
      .then( json => { setPreview(json) } )
      .catch( err => { setErrors(err.message) })
  };

  useEffect(() => {
      getPreview();
  }, []);

  // Shows watchable returned video in iframe
  const previewVideo = preview.length === 1 && errors.length === 0 ? (
    <section className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">{preview[0].title}</h1>
      <div className="aspect-w-16 aspect-h-9 mx-auto">
        <iframe
          height="315"
          className="rounded-md w-full"
          src={preview[0].preview_video.replace("watch?v=", "embed/")}
          allowFullScreen
        ></iframe>
      </div>
    </section>
  ) : (
    <section className="max-w-lg mx-auto bg-white p-4 rounded-md shadow-md">
      <p className="text-red-500">Video could not load.</p>
    </section>
  );

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">CHI 2023</h1>
      <img className="max-w-36 mx-auto mt-2 mb-2" src="./CHIHead.png" alt="Placeholder Head Text" />
      {previewVideo}
    </div>
  );
}

export default Home