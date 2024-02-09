import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Import = () => {
  const [products, setProducts] = useState();
  const [key, setKey] = useState();
  const [file, setFile] = useState("");
  const [select, setSelect] = useState([]);
  const [show, setShow] = useState([]);
  const [showselect, setShowselect] = useState([]);
  const getkeys = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = JSON.parse(e.target.result);
        const data = text["products"];
        const result = Object.keys(data).map((key) => {
          return { ProductId: key, ...data[key] };
        });
        setProducts(result);
        const keys = Object.keys(result[0]);
        setKey(keys);
      };
      reader.readAsText(file);
    }
  };
  const navigate = useNavigate();
  const handleChange = () => {
    if (products) {
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("key", JSON.stringify(key));
      localStorage.setItem("show", JSON.stringify(show));
      navigate("/tables");
    } else {
      alert("Please Select File");
    }
  };

  useEffect(() => {
    if (file) {
      getkeys();
    }
  }, [file, getkeys]);

  const handleClick = (i) => {
    if (select.includes(i)) {
      const newSelect = select.filter((item) => item !== i);
      setSelect(newSelect);
    } else {
      setSelect([...select, i]);
    }
  };
  const handleClickshow = (i) => {
    if (showselect.includes(i)) {
      const newSelected = showselect.filter((item) => item !== i);
      setShowselect(newSelected);
    } else {
      setShowselect([...showselect, i]);
    }
  };

  const handlefilter = () => {
    const newShow = show.filter((item, i) => !showselect.includes(i));
    setShow(newShow);
    setShowselect([]);
  };

  return (
    <div className="py-5 px-10 flex flex-col gap-5 ">
      <h1 className="text-[#4e4f4e] text-xl">Import Products</h1>
      <div className="flex mt-5 w-full gap-3">
        <div className="shadow-lg p-5 w-1/2 h-[250px] border-2 rounded-sm">
          <div className="flex gap-5">
            <span>Step 1:</span>
            <div className="flex flex-col gap-3">
              <span>Select File</span>
              <div>
                <input
                  type="file"
                  accept=".csv ,.json"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div>
              <span>Supported File Type(s): .CSV, .JSON</span>
            </div>
          </div>
        </div>
        <div className="shadow-lg p-5 w-1/2 h-[250px] border-2 rounded-sm">
          <div className="flex gap-5">
            <span>Step 2:</span>
            <div className="flex flex-col gap-3 w-3/4">
              <span>Specify Format</span>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span>File Type</span>
                  <span className="border-2 px-3 flex w-[250px] min-h-[30px]">
                    <span>{file?.type?.substring(12)}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Character Encoding</span>
                  <span className="border-2 px-3 flex w-[250px] min-h-[30px]">
                    <span>UTF-8</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delimiter</span>
                  <span className="border-2 px-3 flex w-[250px] min-h-[30px]">
                    <span>comma</span>
                  </span>
                </div>
                <div className="flex gap-[173px] items-center flex-start">
                  <span>Has Header</span>
                  <input type="checkbox" checked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-lg p-5 border-2 rounded-sm flex ">
        <div className="flex gap-5">
          <div className="flex gap-1 ">
            <input type="checkbox" className="w-[15px] h-[15px] mt-[5px]" />
            <span>Step 3:</span>
          </div>
          <div className="flex flex-col gap-3">
            <span>Display Handling</span>
            {file ? (
              <div className="flex flex-col gap-3">
                <span>Select the fields to be displayed</span>
                <div className="flex gap-5 ">
                  <div className="flex flex-col gap-3">
                    <span>Available Fields</span>
                    <div className="flex gap-5 justify-center items-center">
                      <div className="border-2 h-full w-max flex flex-col text-[#6e6e6f] gap-1">
                        {key?.map((item, i) => (
                          <span
                            className={`cursor-pointer px-2 py-1  ${
                              select.includes(i) ? "bg-gray-400 text-white" : ""
                            }`}
                            onClick={() => {
                              handleClick(i);
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 justify-center">
                    <div className="border-2 p-1 cursor-pointer">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/metro/20/double-right.png"
                        alt="double-right"
                        onClick={() => {
                          setShow(select);
                          setSelect([]);
                        }}
                      />
                    </div>
                    <div className="border-2 p-1 cursor-pointer">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/metro/20/double-left.png"
                        alt="double-right"
                        onClick={handlefilter}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span>Fields to be Displayed</span>
                    <div className="flex gap-5 justify-center items-center">
                      <div className="border-2 h-full w-full flex flex-col text-[#6e6e6f] gap-1">
                        {show?.map((item, i) => (
                          <span
                            className={`cursor-pointer px-2 py-1  ${
                              showselect.includes(i)
                                ? "bg-gray-400 text-white"
                                : ""
                            }`}
                            onClick={() => {
                              handleClickshow(i);
                            }}
                          >
                            {key[item]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <span>No Files Selected...</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-end justify-end gap-3 w-full">
        <button
          className="bg-[#5cb75b] px-2 py-1 text-[#ffffff] font-bold"
          onClick={handleChange}
        >
          Next
        </button>
        <button
          className="text-[#b34746]"
          onClick={() => {
            setSelect([]);
            setShow([]);
            setShowselect([]);
            setFile();
            setKey();
            setProducts();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Import;
