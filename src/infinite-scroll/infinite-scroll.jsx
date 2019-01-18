import React, { Component } from 'react';

import animesMock from './__mocks__/animes';

import './styles/infinite-scroll.scss';

export default class InfiniteScroll extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      activeIndex: 0,
      slidesToShow: 3,
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

  renderListItems() {
    
    return this.animes.map((an, i) => {
      const classNames = [
        this.state.activeIndex === i ? 'item-current' : '',
        this.state.slidesToShow > i ? 'item-show' : 'item-closed'
      ];
      
      return (
        <li key={i} className={classNames.join(' ')}>
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
