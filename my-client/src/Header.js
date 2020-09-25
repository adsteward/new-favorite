import React from "react";
import "./Header.css";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Header extends React.Component {
  constructor(props) {
    super(props);
    const params = props.params;
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
    };
  }

  render() {
    return (
      <div className="main my5">
        <div className="row d-flex justify-content-end mr-5 mt-3">
          <a
            href="http://localhost:8888"
            role="button"
            className="btn btn-sm btn-secondary mt-2 mb-4"
          >
            {" "}
            {this.state.loggedIn ? "Log Out of Spotify" : "Login to Spotify"}
          </a>
        </div>
        <h1>new favorites</h1>
        <h4>find your new favorite songs based on your current favorites.</h4>
      </div>
    );
  }
}

export default Header;
