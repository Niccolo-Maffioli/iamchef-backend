import '../../style/Tag.css';

const Tag = ({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) => {
  return (
    <div className="tag">
      <span>{tag}</span>
      <button onClick={() => onRemove(tag)}>x</button>
    </div>
  );
}

export default Tag;
