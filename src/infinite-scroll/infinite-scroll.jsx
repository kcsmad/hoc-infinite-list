import React, { Component } from 'react';

import animesMock from './__mocks__/animes';

import './styles/infinite-scroll.scss';

export default class InfiniteScroll extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      threshold: 3,
    };

    this.handleChangeActivePosition = this.handleChangeActivePosition.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleNavigation.bind(this));
    this.animes = animesMock;
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleNavigation.bind(this));
  }

  handleNavigation(e) {
    e.stopPropagation();

    if (e.key === 'ArrowLeft') {
      this.handleChangeActivePosition('Left');
    }

    if (e.key === 'ArrowRight') {
      this.handleChangeActivePosition('Right');
    }
  }

  handleChangeActivePosition(direction) {
    const { activeIndex } = this.state;

    const indexChanged = direction === 'Left'
      ? this.handleChangeIndex(activeIndex - 1, this.animes)
      : this.handleChangeIndex(activeIndex + 1, this.animes);

    this.setState({ activeIndex: indexChanged });
  }

  handleChangeIndex(index, array) {
    const indexModulus = index % array.length;
    return indexModulus < 0
    ? array.length + indexModulus
    : indexModulus;
  }

  handleRelativeIndex(relativeIndex, threshold) {
    const indexArray = [];
    for (let i = relativeIndex - threshold; i <= relativeIndex + threshold; i++) {
      indexArray.push(i);
    }

    return indexArray;
  }

  handleCurrentDisplayedItems(array, activeIndex = 0, threshold = 0) {
    return this.handleRelativeIndex(activeIndex, threshold).map(i => this.handleChangeIndex(i, array));
  }

  renderListItems() {

    const animes = this.handleCurrentDisplayedItems(this.animes, this.state.activeIndex, this.state.threshold);
    console.log(animes);

    return this.animes.map((an, i) => {
      const styles = [
        animes.indexOf(i) > -1 ? 'item-show' : 'item-closed',
        animes[0] === i ? 'item-current' : ''
      ];

      return (
        <li key={i} className={styles.join(' ')}>
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
