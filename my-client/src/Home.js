import React from "react";

import ReactBootstrapSlider from "react-bootstrap-slider";
import "./Home.css";
import Header from "./Header";
import Track from "./Track";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      nowPlaying: { name: "Not Checked", albumArt: "" },
      reccTracks: [],
      allYourTracks: [],
      topTracks: [],
      timeFrame: "6 Months",
      energy: 50,
      dance: 50,
      acoustic: 50,
      popular: 50,
      isTracksRetrieved: false,
      energyChanged: false,
      danceChanged: false,
      acousticChanged: false,
      popularChanged: false,
      // { title, artist, album art}
    };
    this.changeTimeFrame = this.changeTimeFrame.bind(this);
    // this.changeSliderValue = this.changeSliderValue.bind(this, "id");
    //const playlistTracks = this.getSongsInPlaylists();
  }

  render() {
    return (
      <div className="Home">
        <Header params={this.getHashParams()} />

        <div className="row d-flex justify-content-center">
          <div className="col-11 col-md-8 filter-col ">
            <div className="row  justify-content-center">
              <button
                className="btn btn-primary mt-2 mb-1"
                onClick={() => this.getTopTracks()}
              >
                {this.state.isTracksRetrieved
                  ? "Refresh With New Songs"
                  : "Get New Favorites"}
              </button>
            </div>
            <div className="row justify-content-center">
              <div className="btn-group mt-1 mb-3">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.timeFrame}
                </button>
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    type="button"
                    value="4 Weeks"
                    onClick={this.changeTimeFrame}
                  >
                    4 Weeks
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    value="6 Months"
                    onClick={this.changeTimeFrame}
                  >
                    6 Months
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    value="All Time"
                    onClick={this.changeTimeFrame}
                  >
                    All Time
                  </button>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-10 col-lg-2 d-flex justify-content-center">
                <label className="mx-auto">Energy:</label>
              </div>
              <div className="col-10 col-lg-4 d-flex justify-content-center">
                <ReactBootstrapSlider
                  className="mx-auto"
                  id={"energy"}
                  value={this.state.energy}
                  slideStop={this.changeSliderValue.bind(this, "energy")}
                  step={this.state.step}
                  max={100}
                  min={0}
                  orientation="horizontal"
                />
              </div>
              <div className="col-10 col-lg-2 d-flex justify-content-center">
                <label>Danceability:</label>
              </div>
              <div className="col-10 col-lg-4 d-flex justify-content-center">
                <ReactBootstrapSlider
                  id={"dance"}
                  value={this.state.dance}
                  slideStop={this.changeSliderValue.bind(this, "dance")}
                  step={this.state.step}
                  max={100}
                  min={0}
                  orientation="horizontal"
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10 col-lg-2 d-flex justify-content-center">
                <label>Acousticness:</label>
              </div>
              <div className="col-10 col-lg-4 d-flex justify-content-center">
                <ReactBootstrapSlider
                  id={"eacoustic"}
                  value={this.state.acoustic}
                  slideStop={this.changeSliderValue.bind(this, "acoustic")}
                  step={this.state.step}
                  max={100}
                  min={0}
                  orientation="horizontal"
                />
              </div>
              <div className="col-10 col-lg-2 d-flex  justify-content-center">
                <label>Popularity:</label>
              </div>
              <div className="col-10 col-lg-4 d-flex justify-content-center">
                <ReactBootstrapSlider
                  id={"popular"}
                  value={this.state.popular}
                  slideStop={this.changeSliderValue.bind(this, "popular")}
                  step={this.state.step}
                  max={100}
                  min={0}
                  orientation="horizontal"
                />
              </div>
            </div>
            {this.state.isTracksRetrieved && (
              <div className="row  justify-content-center">
                <button
                  className="btn btn-sm btn-secondary mt-1 mb-2"
                  onClick={() => this.makePlaylist()}
                >
                  Make Playlist With Songs
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="row tracks-row d-flex justify-content-center">
          <div className="col-11 col-md-6 tracks-col">
            {this.state.isTracksRetrieved && (
              <div className="row pair-row ">
                <div className="col label-col justify-content-center">
                  if you like this...
                </div>
                <div className="col label-col justify-content-center">
                  <h6>...check this out</h6>
                </div>
              </div>
            )}

            {this.state.reccTracks.map((item, index) => (
              <div className="row pair-row" key={(item, index)}>
                <div
                  className="col track-col"
                  style={{ background: this.getColor(index) }}
                >
                  <Track
                    title={item.top.title}
                    artist={item.top.artist}
                    albumArt={item.top.albumArt}
                  />
                </div>
                <div
                  className="col track-col"
                  style={{ background: this.getColor(index) }}
                >
                  <Track
                    title={item.rec.title}
                    artist={item.rec.artist}
                    albumArt={item.rec.albumArt}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  changeTimeFrame(event) {
    this.setState({ timeFrame: event.target.value });
  }

  changeSliderValue(type, event) {
    switch (type) {
      case "energy":
        this.setState({ energy: event.target.value, energyChanged: true });
        break;
      case "dance":
        this.setState({ dance: event.target.value, danceChanged: true });
        break;
      case "acoustic":
        this.setState({ acoustic: event.target.value, acousticChanged: true });
        break;
      case "popular":
        this.setState({ popular: event.target.value, popularChanged: true });
        break;
      default:
        break;
    }
  }

  getColor(index) {
    //var colors = ["#8AFA82", "#FF5AD1", "#9046CF"];
    var colors = ["#E34A6F", "#F7B2BD"];
    return colors[index % 2];
  }

  getTopTracks() {
    this.setState({ isTracksRetrieved: true });
    var apiTimeFrame = "";
    switch (this.state.timeFrame) {
      case "4 Weeks":
        apiTimeFrame = "short_term";
        break;
      case "6 Months":
        apiTimeFrame = "medium_term";
        break;
      case "All Time":
        apiTimeFrame = "long_term";
        break;
      default:
        break;
    }
    spotifyApi
      .getMyTopTracks({ limit: 50, time_range: apiTimeFrame })
      .then((response) => {
        var idList = [];
        response.items.forEach((track) =>
          idList.push({
            title: track.name,
            artist: track.artists[0].name,
            albumArt: track.album.images[0].url,
            id: track.id,
          })
        );
        this.setState({ topTracks: idList });
        this.setState({ topWithReccs: this.state.topTracks });
        this.findCorrespondingTracks();
      });
  }

  findCorrespondingTracks() {
    this.setState({ reccTracks: [] });
    this.state.topTracks.forEach((track, index) => {
      this.getOneTrack(track.id, index, track.title);
    });
  }

  setFilters(seedObj) {
    if (this.state.energyChanged) {
      seedObj.target_energy = this.state.energy / 100;
    }
    if (this.state.danceChanged) {
      seedObj.target_danceability = this.state.dance / 100;
    }
    if (this.state.acousticChanged) {
      seedObj.target_acousticness = this.state.acoustic / 100;
    }
    if (this.state.popularChanged) {
      seedObj.target_popularity = this.state.popular;
    }
    return seedObj;
  }

  getOneTrack(trackId, index, trackTitle) {
    var seedObj = {
      limit: 1,
      seed_tracks: trackId,
    };
    seedObj = this.setFilters(seedObj);
    var reccTrack = "";
    spotifyApi.getRecommendations(seedObj).then((response) => {
      if (response.tracks[0] !== undefined) {
        reccTrack = {
          title: response.tracks[0].name,
          artist: response.tracks[0].artists[0].name,
          albumArt: response.tracks[0].album.images[0].url,
          id: response.tracks[0].id,
        };
      } else {
        reccTrack = {
          title: "",
          artist: "",
          albumArt: "",
          id: "1234",
        };
      }

      this.setState((state) => {
        const list = [...state.reccTracks];
        const topTrack = state.topTracks[index];
        list.splice(index, 1, { top: topTrack, rec: reccTrack });

        return { reccTracks: list };
      });
    });
  }
  makePlaylist() {
    var energy = this.state.energyChanged
      ? `energy: ${this.state.energy}, `
      : "";
    var dance = this.state.danceChanged ? `dance: ${this.state.dance}, ` : "";
    var popular = this.state.popularChanged
      ? `popular: ${this.state.popular}, `
      : "";
    var acoustic = this.state.acousticChanged
      ? `acoustic: ${this.state.acoustic}, `
      : "";
    var options = {
      name: "new faves",
      description: `a playlist of songs reccomended based on your listening habits and the following filters: time range: ${this.state.timeFrame}, ${energy}${dance}${acoustic}${popular}`,
    };
    this.getUris();
    var token = this.getHashParams().access_token;
    var playlistId = "";
    var userId = "";
    spotifyApi.setAccessToken(token);
    spotifyApi.getMe().then((me) => {
      userId = me.id;
      spotifyApi.createPlaylist(userId, options).then((response) => {
        spotifyApi.getUserPlaylists().then((response) => {
          playlistId = response.items[0].id;
          var uris = this.getUris();
          spotifyApi.addTracksToPlaylist(playlistId, uris);
        });
      });
    });
  }

  getUris() {
    var trackIds = this.state.reccTracks.map((item) => item.rec.id);
    return trackIds
      .map((trackId) => `spotify:track:${trackId}`)
      .filter((trackId) => trackId !== "spotify:track:1234");
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
}

export default Home;
