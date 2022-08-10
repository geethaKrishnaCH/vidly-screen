import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { items, selected, onSelect, idProp, textProp } = this.props;
    return (
      <div>
        <ul className="list-group">
          <li className={"list-group-item" + (selected === "all" ? " active" : "")} onClick={() => onSelect("all")}>All</li>
          {
            items.map(item => {
              return (<li key={item[idProp]} className={"list-group-item" + (selected === item[textProp] ? " active" : "")} onClick={() => onSelect(item.name)}>
                {item[textProp]}
              </li>)
            })
          }
        </ul>
      </div>
    )
  }
}

export default ListGroup;