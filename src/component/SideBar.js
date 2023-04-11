import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Sidebar = ({ handleInputDataChange }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemperPage, setItemperPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  async function fetchData() {
    try {
      const response = await axios.get(
        `https://64307b10d4518cfb0e50e555.mockapi.io/modules/`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemperPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemperPage;
  const indexOfFastItem = indexOfLastItem - itemperPage;
  const currentItems = data.slice(indexOfFastItem, indexOfLastItem);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumber = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={`cursor-pointer text-lg mb-1 ${
            currentPage === number ? "font-bold" : ""
          }`}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextButton = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleDataClick = (data) => {
    handleInputDataChange(data);
  };

  return (
    <aside>
      <div>
        <h1 className="text-xl border px-2 py-3">Modules</h1>
      </div>
      <div className="w-1/2 md:flex md:flex-col gap-2 mx-auto md:w-full mt-10">
        {currentItems?.map((item, index) => {
          return (
            <div
              onDrag={() => handleDataClick(item)}
              onDragStart={(event) => onDragStart(event, "input")}
              draggable
              className="flex flex-1 justify-between items-center border rounded"
              key={index}
            >
              <span className="flex-none px-2 font-bold ">
                {item.input_type}
              </span>
              <input
                type="text"
                disabled
                placeholder={item.name}
                className="flex-1 w-full px-1 py-2 bg-green-100 text-center focus:outline-none"
              />
              <span className="flex-none px-1 font-bold">
                {item.output_type}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center absolute bottom-1 left-16">
        <ul className="list-none flex justify-center items-center gap-2">
          <li className="text-base">
            <button
              onClick={handlePrevious}
              disabled={currentPage === pages[0] ? true : false}
            >
              <BsChevronLeft />
            </button>
          </li>
          {renderPageNumber}
          <li className="text-base">
            <button
              onClick={handleNextButton}
              disabled={currentPage === pages[pages.length - 1]}
            >
              <BsChevronRight />
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default Sidebar;
