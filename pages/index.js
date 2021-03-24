import Link from 'next/link'
import { motion } from "framer-motion";

import styles from '../styles/Home.module.css'

export default function Home() {
 
  return (

    <div className={styles.container}>
        <motion.div key="page" exit={{ opacity: 0 }} className="page" layoutId="1"> 
        
          <motion.div
            className="titel"
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2 }}
          >
            <h1>Изворът на Белоногата</h1>
          </motion.div>

          <motion.div
            key="logo"
            className="logo-big"
            animate={{ opacity: 1, rotate: 360, scale: 3 }}
            transition={{ duration: 4 }}
          >
            <img 
              className="logo"
              src="/41.png" 
              width={500}
              height={500}
              alt="БЗХ">
            </img> 
          </motion.div>
          
          <motion.div
            className="button"
            initial={{ bottom: -300 }}
            animate={{ bottom: 50, opacity: 1 }}
            transition={{ duration: 1.5, delay: 3.5, type: 'spring', bounce: 0.4 }}
            whileTap={{ scale: 0.95 }}
            >
              <Link href="/video">
                <button className="toVideo">Към видеото</button>
              </Link>
          </motion.div>

          <motion.div
            className="copyright"
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3 }}
          >
            <p>Създадено от "Бизнесът за Харманли" {new Date().getFullYear()}</p>
          </motion.div>
        </motion.div>
    </div>
  )
}
