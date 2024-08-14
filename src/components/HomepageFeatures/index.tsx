import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Command-line tool to generate code with LLMs',
    Svg: require('@site/static/img/robot-standard.svg').default,
    description: (
      <>
        Auto-code2 is a nodejs CLI tool for generating code using large language models.
        See the documentation for more information.
      </>
    ),
  },
  {
    title: 'Experiments to see what LLMs are capable of',
    Svg: require('@site/static/img/experiments.svg').default,
    description: (
      <>
        The blog catalogues the experiments conducted to try to find the
        capabilities, limitations, and tricks of coding with LLMs
      </>
    ),
  },
  {
    title: 'Under Construction',
    Svg: require('@site/static/img/under-construction.svg').default,
    description: (
      <>
        Stay tuned, heavily under construction.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
