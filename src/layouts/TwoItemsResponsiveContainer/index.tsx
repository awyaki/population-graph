import styles from "./TwoItemsResponsiveContainer.module.css";

type Props = {
  // first: 横並びでは左側に配置され、縦並びでは上に表示される要素
  first: React.ReactNode;

  //second: 横並びでは右側に配置され、縦並びでは下に表示される要素
  second: React.ReactNode;
};

const TwoItemsResponsiveContainer: React.FC<Props> = ({ first, second }) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>{first}</div>
      <div className={styles.item}>{second}</div>
    </div>
  );
};

export default TwoItemsResponsiveContainer;
