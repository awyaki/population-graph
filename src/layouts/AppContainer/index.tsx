import styles from "./AppContainer.module.css";
type Props = {
  children: React.ReactNode;
};

const AppContainer: React.FC<Props> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export default AppContainer;
