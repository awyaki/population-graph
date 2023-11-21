import styles from "./ErrorPage.module.css";
import Container from "../../layouts/AppContainer";

const ErrorPage: React.FC = () => {
  return (
    <Container>
      <div className={styles.message}>エラーが発生しました</div>
    </Container>
  );
};

export default ErrorPage;
