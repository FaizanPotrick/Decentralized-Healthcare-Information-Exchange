import React from "react";
import classNames from "classnames";

const RoundIcon = ({
  icon: Icon,
  iconColorClass = "text-purple-600",
  bgColorClass = "bg-purple-100",
  className,
}) => {
  const cls = classNames(iconColorClass, bgColorClass, className);
  return (
    <div className={cls}>
      <Icon className="w-5 h-5" />
    </div>
  );
};

const InfoCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center max-w-sm w-full border rounded-lg py-3 px-4">
      <RoundIcon
        icon={icon}
        iconColorClass="text-orange-500"
        bgColorClass="bg-orange-100"
        className="mr-4 p-3 rounded-full"
      />
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">{title}</p>
        <p className="text-lg font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
