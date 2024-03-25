import React, { useState } from "react";
import Modal from "./Modal"; // Import Modal component

const ListHeader = ({ getData }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="list-header">
      <h1>Your list of recipes</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD RECIPE
        </button>
      </div>
      {showModal && (
        <Modal mode={"Create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
