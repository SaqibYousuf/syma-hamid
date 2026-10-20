import React from "react";

/**
 * Page-width wrapper.
 * `className` overrides the default vertical padding (e.g. className="py-0").
 */
function Container({ children, className = "py-14 md:py-16 lg:py-20" }) {
  return (
    <div className={`relative w-full flex-1 px-4 md:px-6 ${className}`}>
      <div className="mx-auto w-full max-w-[1720px]">{children}</div>
    </div>
  );
}

export default Container;
