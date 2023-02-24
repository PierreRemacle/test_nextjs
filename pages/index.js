import styles from '../components/layout.module.css';
import Link from 'next/link';
import AuthenticatedComponent from './api/AuthenticatedComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPhone,
    faLocation,
    faCalendarDay,
    faChalkboardTeacher,
    faMoneyBill
  } from "@fortawesome/free-solid-svg-icons";
  import {
    faFacebook
  } from "@fortawesome/free-brands-svg-icons";

export default function FirstPost() {
    return (

        <>
        <div className={styles.header}>
            <nav className={styles.topnav}>
                <Link href="" className={styles.selected}>Home</Link>
                <Link href="posts/reservation">Reservation</Link>
                <AuthenticatedComponent>
                <Link href="posts/transition">Transition</Link>
                <Link href="posts/students">Students</Link>
                <Link href="posts/ListOfReservation">Table</Link>
                </AuthenticatedComponent>
            </nav>
        </div>
        <div className={styles.body}>
            <div className={styles.container}>
                <h1> Salut didi </h1>
                <h2>  Soutien scolaire pour les élèves du secondaire supérieur </h2>
            </div>
            <div className={styles.block}>
                <h3> Les universitaire pour soutenir les élèves du secondaire </h3>
            
                <div className={styles.paragraphe}>
                    <div className={styles.image} > place holder </div>
                    <div className={styles.pleft}>
                    <p > Bienvenue à l'ASBL Rework, où nous nous engageons à offrir un soutien scolaire de qualité en mathématiques, sciences, physique et chimie.  </p>
                    <br></br>
                    <p >Notre équipe est constituée d’étudiants universitaires dans le domaine des sciences exactes. Notre mission est de transmettre nos connaissances et notre passion pour les sciences à la nouvelle génération. Nous désirons offrir à tout étudiant l’opportunité de réussir dans ces matières complexes. En tant qu'association, nous nous engageons à préparer les jeunes pour qu'ils réussissent et se construisent un avenir prometteur.</p>
                    </div>
                </div>
            </div>
            <div className={styles.block}>
                <h3> Cours particuliers </h3>
                <div className={styles.paragraphe}>
                    <div className={styles.pright}>
                        <p> Nous accueillons les élèves pour répondre à leurs questions et les aider dans la compréhension de leurs devoirs et leurs leçons </p>
                        <br></br>
                        <ul> <FontAwesomeIcon icon={faLocation}/> Où? Collège Saint-Croix Hannut. </ul>
                        <ul> <FontAwesomeIcon icon={faCalendarDay}/> Quand? les samedis matin (10-13h) </ul>
                        <ul> <FontAwesomeIcon icon={faChalkboardTeacher}/> Comment? les cours sont donné par groupe de 4 </ul>
                        <ul> <FontAwesomeIcon icon={faMoneyBill}/> Tarif? 35€/3h </ul>
                    </div>
                    <div className={styles.image} > place holder </div>
                </div>
                
            </div>
            <div className={styles.block}>
                
                <div className={styles.bottom}>
                <h3> contact :</h3>
                <ul> 
                    
                    <p> 
                    <FontAwesomeIcon icon={faEnvelope}/> email : place holder 
                    </p>
                    <p> 
                    <FontAwesomeIcon icon={faPhone}/> telephone : place holder 
                    </p>
                    <p> 
                    <FontAwesomeIcon icon={faFacebook}/> facebook : place holder 
                    </p>
                </ul>
                </div>
                </div>
        </div>
        </>
    )
}
