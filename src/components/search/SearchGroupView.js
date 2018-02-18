import React, { Component } from "react";

class SearchGroupView extends Component {
  render() {
    this.group = this.props.group.map(item => {
      return (
        <div className="col-md-2 photo-col" key={ item.id }>
          <img
            src={ item.src }
            className="rounded group-photo"
            alt=""
            draggable="false"
          />
        </div>
      );
    });
    this.group = this.props.group.length === 0 ? <div className="col-md-12"><p>There are not photos!</p></div> : this.group;

    return (
      <div>
        <div className="row group" id={ this.props.type }>
          { this.group }
        </div>
      </div>
    );
  };
};

export default SearchGroupView;
