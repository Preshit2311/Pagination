import React, { useEffect, useState } from "react";

const App = () => {
  const [store, setStore] = useState([]);
  const [page, setPage] = useState(1);
  const product = async () => {
    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();
    setStore(data.products);
    console.log(data.products);
  };

  useEffect(() => {
    product();
  }, []);

  let itemProduct = 6;

  let start = (page - 1) * itemProduct;
  let end = start + itemProduct;
  let DirButtons = store.slice(start, end);

  let NumButtons=Math.ceil(store.length/itemProduct)

  return (
    <div>
      {store.length <= 0 ? (
        <h1>Loading</h1>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5 m-15  ">
          {DirButtons.map((e, i) => {
            return (
              <div key={i} className="shadow-zinc-600 shadow border-b p-4 rounded-2xl h-min overflow-hidden hover:shadow-xl  bg-black   ">
                <img src={e.images[0]} alt=""     className="w-screen active:scale-95 hover:scale-95   h-80 " />
                <h1 className="text-center" >{e.title}</h1>
                <p className="text-center">
                  {" "}
                  <span className="font-bold">Price: </span>${e.price}{" "}
                </p>
              </div>
            );
          })}
        </div>
      )}
     

<div className="flex items-center justify-center gap-2 m-5">

  
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className=" font-bold text-xl rounded-2xl w-18 h-10 active:scale-95 border-r-2  border-b-2 border-t-0 active:bg-white active:text-black  border-white disabled:opacity-40   shadow-2xl"
  >
    Prev
  </button>


  <span className="font-bold text-lg md:hidden">
    Page {page}
  </span>

  <div className="hidden md:flex gap-2">
    {Array.from({ length: NumButtons }).map((_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`px-3 py-1 font-bold rounded-xl  border-r-2  border-b-2 border-t-0 ${
          page === i + 1 ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {i + 1}
      </button>
    ))}
  </div>

 
  <button
    onClick={() => setPage(page + 1)}
    disabled={end >= store.length}
    className="border-r-2  border-b-2 border-t-0  font-bold text-xl rounded-2xl w-18 h-10 active:scale-95 isabled:opacity-40"
  >
    Next
  </button>
</div>

    </div>
  );
};

export default App;
