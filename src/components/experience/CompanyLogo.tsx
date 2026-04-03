import React from "react";

const CompanyLogo = ({ logo }: { logo: string | null }) => {
  return (
    <div>
      {logo ? (
        <img
          src={logo}
          className="h-[80px] w-[80px] object-contain"
          width={80}
          height={80}
          alt="company-logo"
        />
      ) : (
        <div className="w-[80px] h-[80px] bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300 rounded-full"></div>
      )}
    </div>
  );
};

export default CompanyLogo;
