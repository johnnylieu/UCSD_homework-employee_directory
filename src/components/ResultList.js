import React from "react";

function ResultList(props) {
  
  return (
    <ul className="list-group">
      {props.results.map(result => (
    <li className="list-group-item" key={result.login.uuid}>
      <img alt={result.title} className="img-fluid" src={result.picture.thumbnail} />
      <p>{result.name.first} {result.name.last}</p>
      <p>{result.phone}</p>
      <p>{result.dob.date}</p>
    </li>
  ))}
    </ul>
  );
}

export default ResultList;
