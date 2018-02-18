import React, { Component } from "react";

class SearchList extends Component {
  constructor(props) {
    super(props);
  };

  handleMouseDown(e, type, id) {
    this.element = e.target;
    this.avatar = this.element.cloneNode(true);
    this.type = type;
    this.id = id;

    document.onmousemove = this.handleMouseMove.bind(this);
    document.onmouseup = this.handleMouseUp.bind(this);
  };

  handleMouseUp(e) {document.onmousemove = document.onmouseup = null;
    this.element.classList.remove("selected");
    this.avatar.remove();

    var currentGroup = document.elementFromPoint(e.clientX, e.clientY);
        currentGroup = currentGroup ? currentGroup.closest(".group-title") : null;
        currentGroup = currentGroup ? currentGroup.children[0] : null;
        currentGroup = currentGroup ? currentGroup.getAttribute("data-type") : null;

    this.addInGroup(currentGroup);
  };

  handleMouseMove(e) {
    this.element.parentNode.insertBefore(this.avatar, this.element);
    this.element.classList.add("selected");
    this.avatar.classList.add("draggable");

    var shiftY = this._getCoords(this.element).top,
        shiftX = this._getCoords(this.element).left,
        top = e.clientY - shiftY - (this.avatar.offsetHeight / 2),
        left = e.clientX - shiftX - (this.avatar.offsetWidth / 2);

    this.avatar.style.top = top + "px";
    this.avatar.style.left = left + "px";
  };

  _getCoords(element) {
    var element = element.getBoundingClientRect();

    return {
      top: element.top,
      left: element.left
    };
  };

  addInGroup(currentGroup) {
    if(this.type === currentGroup) {
      this.props.handleChange(this.type, this.id);
    };
  };

  render() {
    this.photosList = this.props.photos.map((item) => {
      return (
        <div className="col-md-2 photo-col" key={ item.id }>
          <img
            src={ item.src }
            className="rounded photo"
            alt=""
            data-type={ item.type }
            onMouseDown={ (e) => this.handleMouseDown(e, item.type, item.id) }
            onDragStart={ (e) => { e.preventDefault() } }
            draggable="false"
          />
        </div>
      );
    });
    this.photosList = (this.photosList.length === 0) ? <div className="col-md-12"><p>Find new photos!</p></div> : this.photosList;

    return (
      <div className="row photos">
        { this.photosList }
      </div>
    );
  };
};

export default SearchList;
