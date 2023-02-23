import React from "react";
import styles from "./Home.module.css";
import DesktopNav from "../../components/common/DesktopNav/DesktopNav";
import Hero from "../../components/home/Hero/Hero";
import Features from "../../components/home/Features/Features";
import Footer from "../../components/common/Footer/Footer";

export default function Home() {
  return (
    <div>
      <div className={styles.navnHero}>
        <DesktopNav className={styles.nav} />
        <Hero className={styles.hero} />
      </div>
      <Features/>
      <Footer/>
    </div>
  );
}
