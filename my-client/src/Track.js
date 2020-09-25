import React from "react";
import "./Track.css";
import loading from "./loading_1.png";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = { img: loading };
  }

  handleImgLoaded() {
    this.setState({ img: this.props.albumArt });
  }

  render() {
    return (
      <div className="row d-inline-flex justify-items-left track">
        <div className="col-md-4 album-col text-center">
          <img
            src={this.state.img}
            onLoad={this.handleImgLoaded.bind(this)}
          ></img>
        </div>
        <div className="col-md-8 text-col">
          Title: {this.props.title}
          <br></br>
          Artist: {this.props.artist}
        </div>
      </div>
    );
  }
}

export default Track;
