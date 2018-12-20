import React, { Component } from "react";

const API = "https://randomuser.me/api/?results=";
const DEFAULT_QUERY = "50";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: []
    };
  }
  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            hits: data.results
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, hits } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="user-profile">
          <ul className="list-group list-group-flush">
            {hits.map(hit => (
              <li className="list-group-item">
                <a href={hit.url}>
                  <img
                    alt=""
                    src={hit.picture.medium}
                    className="rounded-circle"
                  />
                  <div className="fullname">
                    {hit.name.first} {hit.name.last}{" "}
                  </div>
                  <div className="description">
                    <div>
                      <span className="label"> Email : </span>
                      {hit.email}
                    </div>
                    <div>
                      <span className="label">Ville : </span>
                      {hit.location.city}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary bAjouter"
                  >
                    Ajouter
                  </button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
