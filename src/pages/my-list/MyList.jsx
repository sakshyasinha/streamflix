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
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">My List</h1>
      {list.length === 0 ? (
        <p>No items in your list yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {list.map((item) => (
            <div key={item.id} className="bg-gray-800 p-2 rounded">
              <img src={`https://image.tmdb.org/t/p/w500${item.poster}`} alt={item.title} />
              <h2 className="mt-2 text-center text-sm">{item.title}</h2>
              <button
                className="mt-2 bg-red-500 px-2 py-1 text-xs rounded w-full"
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
