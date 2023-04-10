import { useEffect, useState } from "react";

function SingleBook({ id }) {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    let req = "http://127.0.0.1:8000/api/books/" + id + "/";
    fetch(req)
      .then((response) => response.json())
      .then((data) => {
        setInfo(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const displayInfo = () => {
    return (
      <div>
        <p>Id:{info.id}</p>
        <p>Title: {info.title}</p>
        <p>Author: {info.author}</p>
        <p>Genre: {info.genre}</p>
        <p>Year: {info.year}</p>
        <p>Inventory: {info.inventory}</p>
      </div>
    );
  };

  return <p>{displayInfo()}</p>;
}

export default SingleBook;
