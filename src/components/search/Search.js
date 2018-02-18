import React, { Component } from "react";
import SearchList from "./SearchList";
import SearchGroup from "./SearchGroup";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      photos: [],
      groups: {}
    };

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(type, id) {
    var photos = this.state.photos,
        groups = this.state.groups,
        movedPhoto;

    movedPhoto = photos.filter((item) => {
      if(item.id === id) {
        return item;
      };
    });

    photos = photos.filter((item) => {
      if(item.id !== id) {
        return item;
      };
    });

    groups[type] = groups[type] || [];
    groups[type].push(movedPhoto[0]);

    this.setState({
      groups,
      photos
    });

    this.photos = this.state.photos;
    this.groups = this.state.groups;
  };

  handleSearch(searchValue) {
    var searchValue = searchValue.replace(/[^a-z\d\s,(1)]+/gi, "");
        searchValue = searchValue.trim().toLowerCase();

    this.setState({ searchValue });
  };

  handleSubmit(e) {
    e.preventDefault();

    this.groups = this.groups || {};
    this.photos = this.photos || [];

    var options = {
          method: "GET"
        },
        tags = this.state.searchValue;
        tags = tags.split(",");
        tags = tags.filter((value, index, self) => {
          return self.indexOf(value) === index && value !== "";
        });

    this.setState({ searchValue: "" });

    if(tags.length === 0) {
      alert("There is not valid query!");
    } else {
      tags.forEach(item => {
        fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e68619f3aae0d2452e857258922baee6&tags=" + item + "&privacy_filter=public&media=photos&per_page=5&format=json&nojsoncallback=1", options)
          .then(data => data.json())
          .then(data => {
            if(data.stat === "ok") {
              if(data.photos.photo.length !== 0) {
                data.photos.photo.forEach(photo => {
                  this.photos.push({
                    id: (photo.id + photo.secret) + Math.random(1, 10),
                    src: "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg",
                    type: item
                  });
                });

                this.groups[item] = (item in this.groups) ? this.groups[item] : [];

                this.setState({
                  groups: this.groups
                });
                this.setState({
                  photos: this.photos
                });
              } else {
                alert("There are not results: " + item);
              };
            } else {
              console.log(`Error code: ${data.code}, ${data.message}`);
            }
          });
      });
    };
  };

  render() {
    return (
      <div className="container wrapper">
        <div className="row">
          <div className="col-md-12">
            <form
              onSubmit={ (e) => this.handleSubmit(e) }
            >
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Type tags example: cat,dog"
                  value={ this.state.searchValue }
                  onChange={ (e) => this.handleSearch(e.target.value) }
                  required
                />
                <div className="input-group-append">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Search"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <SearchList photos={ this.state.photos } handleChange={ this.handleChange } />
        <SearchGroup groups={ this.state.groups } />
      </div>
    );
  };
};

export default Search;
