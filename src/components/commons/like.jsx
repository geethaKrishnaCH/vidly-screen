import React, { Component } from "react";

class Like extends Component {

  render() {
    const red = {
      color: "red"
    }
    const classes= this.props.liked ? "fa fa-heart" : "fa fa-heart-o" 
    return (
      <span onClick={() => {this.props.changeLiked(this.props.id)}} style={this.props.liked ? red:undefined}>
        <i className={classes} aria-hidden="true" />
      </span>
    );
  }
}

export default Like;