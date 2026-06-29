import Link from 'next/link';
import React, { useCallback } from 'react';
import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface ITabProps {
  title: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  image?: string
}
interface INavTabsProps {
  tabs: ITabProps[];
  textStyles: string;
  textActive: string;
  divStyles?: string;
  tabStyles?: string;
  pathIncludes?: boolean;
}

export const NavTabs: FC<INavTabsProps> = ({
  tabs,
  textStyles,
  textActive,
  divStyles,
  tabStyles,
  pathIncludes,
}) => {
  const router = useRouter();

  const checkIsActive = useCallback(
    (href: string) => {
      if (pathIncludes) {
        return router.asPath.includes(href);
      } else {
        return router.asPath === href;
      }
    },
    [router, pathIncludes]
  );

  return (
    <nav className={`flex items-center ${divStyles}`}>
      <ul className={`flex w-full ${tabStyles}`}>
        {tabs?.map((tab, index) =>
          tab.href ? (
            <li
              key={index}
              className={
                checkIsActive(tab.href)
                  ? `font-bold w-100 rounded-[5px] ${textStyles} ${textActive} `
                  : `font-normal ${textStyles}`
              }
            >
              {tab.image ? (<Image alt='' src={tab.image} width={18} height={18} className="w-5 h-5 mr-2 inline"></Image>) : ''}

              <Link href={tab.href}>{tab.title}</Link>
            </li>
          ) : (
            <li
              key={index}
              className={
                tab.isActive
                  ? `font-bold w-100 rounded-[5px] ${textStyles} ${textActive}`
                  : `font-normal ${textStyles} hover:font-bold`
              }
            >
              <button
                onClick={tab.onClick}
                className="py-1 px-3"
              >
                {tab.title}
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};
