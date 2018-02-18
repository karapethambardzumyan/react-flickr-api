import React, { Component } from "react";
import SearchGroupTitle from "./SearchGroupTitle";
import SearchGroupView from "./SearchGroupView";

class SearchGroup extends Component {
  render() {
    this.groupsList = Object.keys(this.props.groups).map(group => {
      return <SearchGroupTitle group={ group } key={ group } />;
    });

    this.groupView = Object.keys(this.props.groups).map(item => {
      return <SearchGroupView group={ this.props.groups[item] } type={ item } key={ item } />;
    });

    return (
      <div>
        <div className="row group-title-header">
          { (this.groupsList.length > 0) ? this.groupsList : <div className="col-md-12"><p>There are not groups!</p></div> }
        </div>
        { this.groupView }
      </div>
    );
  };
};

export default SearchGroup;
