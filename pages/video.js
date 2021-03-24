import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react';
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

export default function Video() {

  const [isOnPoint, setIsOnPoint] = useState();
  

  useEffect(() => {
    function distance(lon1, lat1, lon2, lat2) {
      var R = 6371; // Radius of the earth in km
      var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
      var dLon = (lon2 - lon1).toRad();
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) *
          Math.cos(lat2.toRad()) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km

      return d;
    }

    /** Converts numeric degrees to radians */
    if (typeof Number.prototype.toRad === "undefined") {
      Number.prototype.toRad = function () {
        return (this * Math.PI) / 180;
      };
    }

    return window.navigator.geolocation.getCurrentPosition((pos) => {
      let dist = distance(
        pos.coords.longitude,
        pos.coords.latitude,
        25.937163,
        41.913741
      );
      let roundDist = Math.floor(dist);
      roundDist < 21
        ? setIsOnPoint(true)
        : setIsOnPoint(false)
    }, error);
  }, [])

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("Моля, разрешете използването на местоположение.");
  }

  const player = () => {
    return (
      <motion.div
        key="playa"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        exit={{ opacity: 0 }}
        layoutId="2"
      >
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          url={[{ src: "video.mp4", type: "video/mp4" }]}
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
          onContextMenu={(e) => e.preventDefault()}
          controls
        /> 
      </motion.div>
    )
  }
 
  const locationError = () => {
    return (
      <motion.div className="failPage">
        
        <motion.div
          key={"failPage"}
          className="warning"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img 
            className="logoFail"
            src="/41.png" 
            alt="БЗХ">
          </img> 
          <h2>
            За да гледате това видео, трябва да сте близо до "Изворът на
            белоногата" и да разрешите нa браузърът да използва
            местоположението ви.
          </h2>
        </motion.div>
        <motion.div
          className="backButton"
          initial={{ bottom: -300 }}
          animate={{ bottom: 15, opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5, type: 'spring', bounce: 0.4 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <button className="toVideo">Назад</button>
          </Link>
        </motion.div>
    </motion.div>
    )
  }

  return (
    <div className={styles.container}>
      {isOnPoint ? player() : locationError()}
    </div>
  )
}