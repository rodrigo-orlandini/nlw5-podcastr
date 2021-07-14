import { Header } from "../components/Header";
import { Player } from '../components/Player';

import { PlayerContextProvider } from "../contexts/PlayerContext";
import '../styles/global.scss';
import styles from '../styles/app.module.scss';

const MyApp = ({ Component, pageProps }) => {

  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;