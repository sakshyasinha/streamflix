import React, { useEffect, useState } from "react";
import { getMyList, removeFromMyList } from "../../utils/localStorageUtils";

const MyList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getMyList());
  }, []);

  const handleRemove = (id) => {
    removeFromMyList(id);
    setList(getMyList());
  };

  return (
    <div className="p-6 text-white min-h-screen bg-black">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">My List</h1>

      {list.length === 0 ? (
        <div className="text-center mt-10 opacity-70">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty"
            className="w-20 mx-auto mb-4 opacity-50"
          />
          <p className="text-lg">Your list is empty. Start adding some movies!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {list.map((item) => (
            <div
              key={item.id}
              className="bg-[#1f1f1f] p-2 rounded shadow hover:scale-105 transition-transform"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster}`}
                alt={item.title}
                className="w-full h-64 object-cover rounded"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
              <h2 className="mt-2 text-sm font-semibold text-center">{item.title}</h2>
              <button
                className="mt-3 bg-red-600 hover:bg-red-700 text-xs py-1 px-2 rounded w-full"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
