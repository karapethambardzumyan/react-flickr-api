import React, { Component } from "react";

class SearchGroupTitle extends Component {
  render() {
    return (
      <div className="col-md-3 group-title">
        <a href={ "#" + this.props.group } data-type={ this.props.group }>{ this.props.group }</a>
      </div>
    );
  };
};

export default SearchGroupTitle;
