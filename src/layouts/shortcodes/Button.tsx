import DynamicIcon from "@/helpers/DynamicIcon";
import React from "react";

const Button = ({
  label,
  link,
  style,
  hideIcon,
  className,
  rel,
}: {
  label: string;
  link: string;
  style?: string;
  hideIcon?: string;
  rel?: string;
  className?: string;
}) => {
  return (
    <>
      <a
        className={`btn ${className ? `${className}` : ""} ${!hideIcon ? `has-icon` : ""} ${
          style === "outline" ? "btn-outline-primary" : "btn-primary"
        }`}
        href={link}
        target="_blank"
        rel={`noopener noreferrer ${
          rel ? (rel === "follow" ? "" : rel) : "nofollow"
        }`}
      >
        <span className="value">
          <span data-content={label}>{label}</span>
        </span>
        {!hideIcon && (
          <span className="icon">
            <span>
              <span>
                <DynamicIcon className="text-xs" icon={"FaChevronRight"} />
              </span>
              <span>
                <DynamicIcon
                  aria-hidden={true}
                  className="text-xs"
                  icon={"FaChevronRight"}
                />
              </span>
            </span>
          </span>
        )}
      </a>
    </>
  );
};

export default Button;
