export default function RatingStars({ value = 0, onChange, disabled }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${value >= star ? "active" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => !disabled && onChange?.(star)}
          onKeyDown={(event) => {
            if (!disabled && (event.key === "Enter" || event.key === " ")) {
              onChange?.(star);
            }
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
