import React, { Component } from 'react';

export function withNavigation(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleNavigation.add(this));
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleNavigation.add(this));
    }

    handleNavigation(e) {
      e.stopPropagation();

      if (e.key === 'ArrowLeft') {
        this.handleChangeActivePosition('Left')
      }

      if(e.key === 'ArrowRight') {
        this.handleChangeActivePosition('Right');
      }
    }

    handleChangeActivePosition(direction) {
      const { activeIndex } = this.state;

      const indexChanged = direction === 'Left'
        ? activeIndex - 1
        : activeIndex + 1;

      this.setState({ activeIndex: indexChanged });
    }
  }
}
