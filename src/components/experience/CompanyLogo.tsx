import React from 'react';
import Image from 'next/image';

const CompanyLogo = ({ logo }: { logo: string | null }) => {
  return (
    <div>
      {logo ? (
        <Image src={logo} width={100} height={100} alt="company-logo" />
      ) : (
        <div className="w-[100px] h-[100px] bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300 rounded-full"></div>
      )}
    </div>
  );
};

export default CompanyLogo;
