import React, { Component } from 'react';

import animesMock from './__mocks__/animes';

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.animes = animesMock;
    console.log(this.animes);
  }

  componentWillMount() {

  }

  renderListItems() {
    return this.animes.forEach(an => {
      return (
        <li>
          <a href='http://kkj.com.br'>
            <img alt="anime-cover" src={an.cover} />
            {an.title}
          </a>
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
