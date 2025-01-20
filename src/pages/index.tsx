import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <a href="/blog">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <img src="/img/auto-code-2-header-svg.svg" width="100%" />
      </header>
    </a>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Automatic coding with AI"
    >
      <HomepageHeader />
      <main>
        <div style={{ textAlign: 'center', margin: 'auto', paddingTop: '4em' }}>
          Under construction
        </div>
      </main>
    </Layout>
  );
}
