import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function List() {
  const getItem = () => {
    return JSON.parse(localStorage.getItem("groceries")) || [];
  };
  const [item, setItem] = useState("");
  const [list, setList] = useState(getItem());

  function addItem() {
    let newList = [
      ...list,
      {
        name: item,
        checked: false,
        count: 1,
      },
    ];
    if (item === "") {
      toast.error("Cannot Process Empty Field!", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    } else {
      toast.success("Item has been added", {
        position: "top-center",
        autoClose: 1000,
      });
      setList(newList);
    }
    setItem("");
    localStorage.setItem("groceries", JSON.stringify(newList));
  }
  const removeItem = (i) => {
    const newList = list.filter((_, index) => index !== i);
    toast.success("Item has been deleted", {
      position: "top-center",
      autoClose: 3000,
    });
    setList(newList);
    localStorage.setItem("groceries", JSON.stringify(newList));
  };
  const handleCheckboxChange = (i) => {
    const newList = list.map((item, idx) => {
      if (idx === i) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setList(newList);
    localStorage.setItem("groceries", JSON.stringify(newList));
  };
  const increaseCount = (idx) => {
    const newList = [...list];
    newList[idx].count += 1;
    setList(newList);
    localStorage.setItem("groceries", JSON.stringify(newList));
  };
  const decreaseCount = (idx) => {
    const newList = [...list];
    if (newList[idx].count === 1) {
      toast.info("This is a minimum number for this item! 😅", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    newList[idx].count -= 1;
    setList(newList);
    localStorage.setItem("groceries", JSON.stringify(newList));
  };

  return (
    <div className="container">
      <h2>Grocery Bud</h2>
      <input
        type="text"
        placeholder="Grocery name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button className="addItem" onClick={addItem}>
        Add Item
      </button>
      <div className="groceryBucket">
        {list.map((ele, i) => {
          return (
            <div className="groceryCard" key={i}>
              <div className="productName">
                <input
                  type="checkbox"
                  check={ele.checked}
                  onChange={(e) => handleCheckboxChange(i)}
                />
                <label
                  htmlFor="grocery"
                  style={{
                    textDecoration: ele.checked ? "line-through" : "none",
                  }}
                >
                  {ele.name}
                </label>
              </div>
              <div className="productCount">
                <button
                  title="decrease count"
                  onClick={(e) => decreaseCount(i)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#ed645c"
                      d="M13.54 18a2.06 2.06 0 0 1-1.3-.46l-5.1-4.21a1.7 1.7 0 0 1 0-2.66l5.1-4.21a2.1 2.1 0 0 1 2.21-.26a1.76 1.76 0 0 1 1.05 1.59v8.42a1.76 1.76 0 0 1-1.05 1.59a2.23 2.23 0 0 1-.91.2"
                    />
                  </svg>
                </button>
                <span>{ele.count}</span>
                <button title="increse count" onClick={(e) => increaseCount(i)}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#ed645c"
                      d="M10.46 18a2.23 2.23 0 0 1-.91-.2a1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46"
                    />
                  </svg>
                </button>
              </div>
              <button title="remove item" onClick={() => removeItem(i)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 1200 1200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#ffffff"
                    d="M600 0C268.63 0 0 268.63 0 600c0 331.369 268.63 600 600 600c331.369 0 600-268.63 600-600S931.369 0 600 0m0 130.371c259.369 0 469.556 210.325 469.556 469.629c0 259.305-210.187 469.556-469.556 469.556c-259.37 0-469.556-210.251-469.556-469.556C130.445 340.696 340.63 130.371 600 130.371M435.425 305.347L305.347 435.425L469.922 600L305.347 764.575l130.078 130.078L600 730.078l164.575 164.575l130.078-130.078L730.078 600l164.575-164.575l-130.078-130.078L600 469.922z"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default List;
