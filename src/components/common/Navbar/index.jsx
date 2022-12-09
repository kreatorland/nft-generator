// import Head from "next/head";
// import Link from "next/link";
import { Link } from "react-router-dom";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import styles from "./Navbar.module.scss";
import { Helmet } from "react-helmet-async";
import Button from "../Button";


config.autoAddCss = false;

// type Props = {
//   title?: string;
//   description?: string;
//   author?: string;
//   className?: string;
//   link?: string;
//   image?: string;
//   dullBackground?: boolean;
// };

const Navbar = ({ //: React.FunctionComponent<Props> 
  title = "NFT generator",
  description = " ",
  author,
  link = "",
  image = "/static/images/illustration.svg",
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="author" content={author} />
        <meta name="description" content={description} />
        <link rel="canonical" href={link} />

        <meta property="og:site_name" content="Lock Save" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={link} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:url" content={link} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <style>{dom.css()}</style>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X35LBBMT97"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-X35LBBMT97');`,
          }}
        />
      </Helmet>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Link to="/home">
            {/* <a> */}
              <div className={styles.logoWrapper}>
                <h2>Home</h2>
              </div>
            {/* </a> */}
          </Link>

          <div className={styles.menu}>
            <span className={styles.link}>
              <Link to="/generator">
                  <Button title="GENERATE" className={styles.navbar__button} />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
