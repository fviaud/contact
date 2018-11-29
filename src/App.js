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

  // componentDidMount() {
  //   fetch(API + DEFAULT_QUERY)
  //     .then(response => response.json())
  //     .then(data => this.setState({ hits: data.hits }));
  // }

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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a class="navbar-brand" href="#">
                Hidden brand
              </a>
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    test4
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#">
                    Disabled
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <ul className="list-group list-group-flush">
            {hits.map(hit => (
              <li className="list-group-item">
                <img
                  alt=""
                  src={hit.picture.medium}
                  className="rounded-circle"
                />
                <a href={hit.url}>
                  {" "}
                  {hit.name.first} {hit.name.last}
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
