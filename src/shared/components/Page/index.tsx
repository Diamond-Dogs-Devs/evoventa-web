"use client";
import { Heading } from "@/shared/ui/src";
import { Props } from "./types";

const Page = ({ title, subtitle, children }: Props) => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 bg-ghost-blue-400 lg:ml-[80px]">
      <Heading className="mb-2">{title}</Heading>
      <span className="text-lg font-semibold border-b border-primary-200 py-4 text-title-secondary">
        {subtitle}
      </span>
      <div className="relative mt-8">{children}</div>
    </div>
  );
};

export default Page;
