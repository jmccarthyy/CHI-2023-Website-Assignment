/**
 * Footer component
 * 
 * This is the component for the footer that will be displayed on all pages
 * 
 * @author Jake McCarthy
 */

import { useState, useEffect } from 'react';

function Footer() {
  const [footerInfo, setFooterInfo] = useState({});

  const getFooter = () => {
    fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/developer')
    .then( response => response.json() )
    .then( json => { setFooterInfo(json) } )
    .catch( err => { console.log(err.message) })
  };

  useEffect(() => {
    getFooter();
  }, []);

  const footer = (
    <div>
      <p>{footerInfo.id}</p>
      <p>{footerInfo.name}</p>
      <p>{footerInfo.assignment}</p>
    </div>
  );

  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      <div>
        {footer}
      </div>
    </footer>
  );
}
  
  export default Footer;