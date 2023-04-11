import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  async function fetchData() {
    try {
      const response = await axios.get(
        "https://64307b10d4518cfb0e50e555.mockapi.io/workflow"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <h1 className="p-2 shadow-lg text-2xl ">Workflows</h1>

      <div className="my-20 w-full">
        <table className="border-collapse border border-white w-3/6 mx-auto  ">
          <thead className="bg-sky-600 border border-white text-white">
            <tr className="">
              <th className="py-3 px-2 ml-2 border border-white text-left">
                Name
              </th>
              <th className="py-3 px-2 ml-2 border border-white text-left">
                Input Type
              </th>
              <th className="py-3 px-2 ml-2 border border-white text-left">
                Created at
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr className="bg-slate-200 border-2 border-white " key={index}>
                  <td className="py-3 px-2 ml-2 border border-white text-left">
                    <Link to={`/workflow/${item.id}`} className="underline">
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-3 px-2 ml-2 border border-white text-left font-semibold ">
                    {item.input_type}
                  </td>
                  <td className="py-3 px-2 ml-2 border border-white text-left">
                    {item.createdAt.slice(0, 10)}
                  </td>
                </tr>
              );
            })}
            {/* <tr className="bg-slate-200 border-2 border-white ">
              <th className="py-3 px-2 ml-2 border border-white text-left">
                <Link to="" className="underline">
                  Workflow
                </Link>
              </th>
              <th className="py-3 px-2 ml-2 border border-white text-left">
                Workflow
              </th>
              <th className="py-3 px-2 ml-2 border border-white text-left">
                Workflow
              </th>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
