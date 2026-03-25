export const Card = ({ children, className = "" }) => (
  <div className={`bg-egm-panel rounded-egm p-6 ${className}`}>
    {children}
  </div>
);
