"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface CardButtonProps {
  icon: IconDefinition;
  iconColor?: string;
  label: string;
  onClick?: () => void;
}

export const CardButton: React.FC<CardButtonProps> = ({
  icon,
  iconColor = "text-gray-800",
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-white border shadow-md hover:shadow-lg rounded-xl px-4 py-6 text-xs text-gray-800 hover:bg-gray-100 flex flex-col items-center justify-center gap-2 w-32 h-32 transition"
    >
      <FontAwesomeIcon size="2x" icon={icon} className={iconColor} />
      <span className="text-center">{label}</span>
    </button>
  );
};
