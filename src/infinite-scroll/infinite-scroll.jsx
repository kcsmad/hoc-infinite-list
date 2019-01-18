import React, { Component } from 'react';

import animesMock from './__mocks__/animes';

import './styles/infinite-scroll.scss';

export default class InfiniteScroll extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      activeIndex: 1,
    };
  
    this.handleChangeActivePosition = this.handleChangeActivePosition.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }
  
  activeHandler() {
    document.addEventListener('keydown', this.handleNavigation);
  }
  
  

  componentWillMount() {
    this.activeHandler();
    this.animes = animesMock;
  }
  
  handleNavigation(e) {
    if (e.key === 'ArrowLeft') {
      this.handleChangeActivePosition('Left');
      console.log(this.state.activeIndex);
    }
  
    if (e.key === 'ArrowRight') {
      this.handleChangeActivePosition('Right');
      console.log(this.state.activeIndex);
    }
  }
  
  handleChangeActivePosition(direction) {
    const { activeIndex } = this.state;
    
    const indexChanged = direction === 'Left'
      ? this.handleChangeIndex(activeIndex + 1, this.animes)
      : this.handleChangeIndex(activeIndex - 1, this.animes);
    
    this.setState({ activeIndex: indexChanged });
  }
  
  handleChangeIndex(index, array) {
    const indexModulus = index % array.length;
    return indexModulus < 0
    ? array.length + indexModulus
    : indexModulus;
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
    const { activeIndex } = this.state;
    
    
    return (
      <div className="infinite-scroll-wrapper">
        <ul className="infinite-scroll-list">
          { this.renderListItems() }
        </ul>
      </div>
    );
  }
}
