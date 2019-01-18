import React, { Component } from 'react';

import animesMock from './__mocks__/animes';

export default class InfiniteScroll extends Component {

  componentWillMount() {

    this.animes = animesMock;
    console.log(this.animes);
  }

  renderListItems() {
    return this.animes.map(an => {
      return (
        <li>
          <img alt="anime-cover" src={"images/" + an.cover} />
          <p>{an.title}</p>
        </li>
      )
    })
  }

  render() {
    return (
      <div className="infinite-scroll-wrapper">
        <ul className="infinite-scroll-list">
          { this.renderListItems() }
        </ul>
      </div>
    );
  }
}
