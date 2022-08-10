import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { items, selected, onSelect } = this.props;
    console.log(items);
    return (
      <div>
        <ul className="list-group">
          <li className={"list-group-item" + (selected === "all" ? " active" : "")} onClick={() => onSelect("all")}>All</li>
          {
            items.map(item => {
              return (<li key={item._id} className={"list-group-item" + (selected === item.name ? " active" : "")} onClick={() => onSelect(item.name)}>
                {item.name}
              </li>)
            })
          }
        </ul>
      </div>
    )
  }
}

export default ListGroup;