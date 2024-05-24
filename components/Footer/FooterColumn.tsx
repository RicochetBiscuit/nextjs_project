import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Links } from "@/app/common.types";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { clickableChange } from "@/store/redux/isClickable";

interface FooterColumnProps {
  Links: Links[];
  selectedLink?: string;
}

const FooterColumn = ({ Links, selectedLink }: FooterColumnProps) => {
  const { t } = useTranslation(["index"]);
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const dispatch = useDispatch();
  
  const handleMouseEnter = () => {
    if (isClickable == false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };
  return (
    <div className="footer_column">
      <ul
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col gap-2 font-normal text-white"
      >
        {Links.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className={`hover:text-log-col hover:scale-110 cursor-none ${
              selectedLink === link.href && link.href !== "/"
                ? "text-log-col"
                : ""
            } relative group transition-all duration-300 ease-in-out transform origin-bottom whitespace-nowrap`}
            onClick={() => {
              if (isClickable == true) {
                dispatch(clickableChange(false));
              }
            }}
          >
            {t(link.text)}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-log-col ${
                selectedLink === link.href && link.href !== "/"
                  ? "w-full"
                  : "w-0 transition-all duration-300 ease-in-out group-hover:w-full"
              }`}
            ></span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
