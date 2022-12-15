import BottomNav from "../../components/common/BottomNav";
import Layout from "../../components/common/Layout";
import Data from "../../components/Data";
import Layers from "../../components/Layers";
import React from "react";
import styles from "./index.module.scss";

const arr = [];
for (let i = 0; i < 100; i++) {
  arr.push("canvas");
}

function Generator() {
  return (
    <nav>
      <Layout dullBackground>
        <div style={{ display: "none" }}>
          {arr.map((_, i) => (
            <canvas id={`working-canvas-${i}`} />
          ))}
        </div>
        <div className={styles.container}>
          <Data />
          <Layers />
        </div>

        <BottomNav />
      </Layout>
    </nav>
    // <Layout dullBackground>
    //   <div className={styles.container}>
    //     <Data />
    //     <Layers />
    //   </div>

    //   <BottomNav />
    // </Layout>
  );
}

export default Generator;
