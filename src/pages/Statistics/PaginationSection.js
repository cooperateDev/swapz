import _ from "lodash";
import classNames from "classnames";

export default function PaginationSection({ ...props }) {
  return (
    <div className="px-6 pt-3 -mb-2 space-x-2 justify-center">
      <PageButton num={1} {...props} />
      <PageButton num={2} {...props} />
      <PageButton num={3} {...props} />
      <PageButton num={"..."} {...props} />
    </div>
  );
}

function PageButton({ pageNum, num, setPageNum, ...props }) {
  return (
    <div
      className={classNames(
        "px-2 rounded-md inline-block  cursor-pointer text-sm",
        {
          "text-white bg-light-purple": pageNum === num,
          "text-gray-400 bg-transparent border-gray-100 hover:text-indigo-800 hover:bg-indigo-50":
            pageNum !== num && num !== "...",
        }
      )}
      onClick={() => (_.isNumber(num) ? setPageNum(num) : undefined)}
      {...props}
    >
      {num}
    </div>
  );
}
