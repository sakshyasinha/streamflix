// src/components/AddToListButton.jsx
import React, { useState, useEffect } from "react";
import {
  saveToMyList,
  removeFromMyList,
  isInMyList
} from "../utils/localStorageUtils";

const AddToListButton = ({ item }) => {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setInList(isInMyList(item.id));
  }, [item.id]);

  const toggleList = () => {
    if (inList) {
      removeFromMyList(item.id);
    } else {
      saveToMyList(item);
    }
    setInList(!inList);
  };

  return (
    <button
      className="bg-red-600 px-3 py-1 rounded text-white"
      onClick={toggleList}
    >
      {inList ? "Remove from My List" : "Add to My List"}
    </button>
  );
};

export default AddToListButton;
