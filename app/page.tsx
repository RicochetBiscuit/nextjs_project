import Section from "@/components/Section";
import { SectionData } from "./common.types";
import LandingSect from "@/components/Sections/LandingSect/LandingSect";
import PortfolioSect from "@/components/Sections/PortfolioSect/PortfolioSect";
import LogoSect from "@/components/Sections/LogoSection/LogoSect";
import ResponsiveSect from "@/components/Sections/DesignSect/DesignSect";
import CodeSect from "@/components/Sections/CodeSect/CodeSect";
import IntroductionSect from "@/components/Sections/IntroductionSect/IntroductionSect";

const Home = () => {
  const sectionsData: SectionData[] = [
    {
      name: "Landing Section",
      children: <LandingSect />,
      parallax: true,
      background: "/galata_0.png",
      topImage: "/galata_1.png",
      className: "h-auto min-h-[100svh] w-[100svw]",
    },
    {
      name: "Introduction",
      children: <IntroductionSect />,
      smoothScroll: true,
      className: "h-auto min-h-[95svh] bg-cool-gray-900 pt-14",
    },
    {
      name: "Responsive Design",
      children: <ResponsiveSect />,
      smoothScroll: true,
      className: "h-auto min-h-[98svh] bg-cool-gray-900 py-20",
    },
    {
      name: "Code Sect",
      children: <CodeSect />,
      smoothScroll: true,
      className: "h-auto min-h-[100svh] bg-cool-gray-900 py-20",
    },
    {
      name: "Portfolio",
      children: <PortfolioSect />,
      smoothScroll: true,
      className: "h-auto min-h-[80svh] py-24 w-full",
    },
    {
      name: "Logo",
      children: <LogoSect />,
      className: "h-auto min-h-auto bg-cool-gray-900 py-5",
    },
  ];

  return (
    <>
      <div>
        <Section sectionsData={sectionsData}></Section>
      </div>
    </>
  );
};

export default Home;
