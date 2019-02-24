import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const url = "http://www.espncricinfo.com/rss/content/feeds/news/8.xml"; //feed url
    var apiurl = "https://api.rss2json.com/v1/api.json?rss_url=" + url;

    fetch(apiurl)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.items
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log({ items });
      return (
        <ul>
          {items.map(item => (
            <li key={item.title}>
              <a href={item.link}>
                <h6> {item.title}</h6>
              </a>
              <p>{item.content}</p>
              <span>
                {item.pubDate} {this.props.name}
              </span>
            </li>
          ))}
        </ul>
      );
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App name="alexson seraus" />, rootElement);
