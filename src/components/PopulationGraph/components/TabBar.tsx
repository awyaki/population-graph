type Props = {
  children: React.ReactNode;
};

export const TabBar: React.FC<Props> = ({ children }) => {
  return <div role="tablist">{children}</div>;
};
