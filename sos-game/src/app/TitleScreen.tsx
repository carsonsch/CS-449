import ScrollingWordBackground from './ScrollingWordBackground'
import styles from './TitleScreen.module.css'

export default function TitleScreen() {

    return (
        <div>
            <ScrollingWordBackground/>
            <div className={styles.titleScreen}>
                <div className={styles.banner}>
                    This is the title screen!
                </div>
            </div>
        </div>
    )
}
  