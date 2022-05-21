import * as React from 'react';
import { FaReact, FaGithub } from 'react-icons/fa';
import styles from '../styles/navbar.scss';

const REPO_URL: string = 'https://github.com/scottjason/ts-boilerplate-graphql-pg';

export const Navbar = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <span className={styles.reactIcon}>
          <FaReact />
        </span>
        <h1 className={styles.heading}>AUTHENTICATION BOILERPLATE</h1>
      </div>
      <div className={styles.inner}>
        <span onClick={() => window.open(REPO_URL)} className={styles.githubIcon}>
          <FaGithub />
        </span>
        <h3 onClick={() => window.open(REPO_URL)} className={styles.sourceCode}>
          SOURCE CODE
        </h3>
      </div>
    </div>
  );
};
