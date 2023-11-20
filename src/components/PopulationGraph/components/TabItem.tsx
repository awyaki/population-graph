type Props = {
  id: string;
  text: string;
  selected: boolean;
  onClick: (tabId: string) => void;
};

export const TabItem: React.FC<Props> = ({ id, text, selected, onClick }) => {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={() => {
        onClick(id);
      }}
    >
      {text}
    </button>
  );
};
