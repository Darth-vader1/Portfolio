interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const itemList = items || [];
  const marqueeItems = [...itemList, ...itemList];

  return (
    <div className="strip">
      <div className="strip-inner">
        {marqueeItems.map((item, index) => (
          <span className="strip-item" key={index}>
            <i className="fas fa-star"></i> {item}
          </span>
        ))}
      </div>
    </div>
  );
}
