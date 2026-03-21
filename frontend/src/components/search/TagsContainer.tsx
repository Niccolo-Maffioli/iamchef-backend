import Tag from "./Tag";
import '../../style/Tag.css';

type tagsContainerProps = {
  tags: string[];
  onRemove: (tag: string) => void;
};

const TagsContainer = ({ tags, onRemove }: tagsContainerProps) => {
  return (
    <div className="tags-container">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default TagsContainer;
