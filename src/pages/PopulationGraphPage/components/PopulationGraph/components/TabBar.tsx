import styles from "./TabBar.module.css";
type Props = {
  children: React.ReactNode;
};

export const TabBar: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper} role="tablist">
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
