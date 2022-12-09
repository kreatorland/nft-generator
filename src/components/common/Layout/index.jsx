import * as React from "react";
import Navbar from "../Navbar";

import styles from "./index.module.scss";
import { HelmetProvider } from 'react-helmet-async';

// type Props = {
//   title?: string;
//   description?: string;
//   author?: string;
//   image?: string;
//   link?: string;
//   headerClassName?: string;
//   className?: string;
//   noNavBar?: boolean;
//   dullBackground?: boolean;
// };

const Layout = ({ //: React.FunctionComponent<Props>
  children,
  title = "NFT generator",
  headerClassName,
  className,
  description,
  author,
  image,
  link,
  noNavBar,
  dullBackground,
}) => (
  <HelmetProvider >
    {!noNavBar && (
      <Navbar
        title={title}
        description={description}
        author={author}
        className={headerClassName}
        link={link}
        image={image}
      />
    )}
    <div
      className={`${styles.layout} ${
        dullBackground ? styles.dullBackground : ""
      }`}
    >
      {children}
    </div>
  </HelmetProvider >
);

export default Layout;
