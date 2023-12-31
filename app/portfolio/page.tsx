"use client";
import { useState, useEffect } from "react";
import PortfolioItem, { PortfolioItemProps } from "@/components/PortfolioItem";
import { portfolioPageItems } from "@/constants/portfolioPageItems";

const Portfolio = () => {
  return (
    <section>
      <div className=" h-auto w-auto flex flex-col justify-center items-center min-w-screen py-[60px]">
        <div className="flex flex-wrap justify-center items-center max-w-[1500px] gap-10">
          {portfolioPageItems.map((item: PortfolioItemProps, index: number) => (
            <PortfolioItem
              key={index}
              image={item.image}
              imageAlt={item.imageAlt}
              title={item.title}
              projectType={item.projectType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
