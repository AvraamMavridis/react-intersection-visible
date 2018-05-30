import 'intersection-observer';
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable no-unused-vars */

export default class Visible extends Component
{
  static propTypes = {
    active      : PropTypes.bool,
    className   : PropTypes.string,
    onIntersect : PropTypes.func.isRequired,
    onShow      : PropTypes.func,
    onHide      : PropTypes.func,
    options     : PropTypes.shape( {
      root       : PropTypes.node,
      rootMargin : PropTypes.number,
      threshold  : PropTypes.oneOfType( [ PropTypes.number, PropTypes.array ] ),
    } ),
    children : PropTypes.oneOfType( [ PropTypes.node, PropTypes.arrayOf( PropTypes.node ) ] ),
  };

  static defaultProps = {
    active    : true,
    className : 'intersection-visible-wrapper',
  }

  /**
   * Handles the visibility changes
   *
   * @param {array} entries
   * @memberOf Visible
   */
  handleObserverUpdate = ( entries ) =>
  {
    const { onIntersect, onShow, onHide } = this.props;
    const { intersectionRect } = entries[ 0 ];
    const { top, left, bottom, right } = intersectionRect;

    if ( [ top, bottom, left, right ].some( Boolean ) && onShow )
    {
      onShow( entries );
    }
    else if ( onHide )
    {
      onHide( entries );
    }

    onIntersect( entries );
  };

  /**
   * Starts the observer
   *
   * @memberOf Visible
   */
  startObserving()
  {
    this.observer.observe( this.refs.visible );
  }

  /**
   * Stops the observer
   *
   * @memberOf Visible
   */
  stopObserving()
  {
    this.observer.unobserve( this.refs.visible );
  }

  /**
   * Init the observer on mounting
   *
   * @memberOf Visible
   */
  componentWillMount()
  {
    const { options } = this.props;
    this.observer = new IntersectionObserver( this.handleObserverUpdate, options );
  }


  /**
   * Start the observer when the component is mounted
   *
   * @memberOf Visible
   */
  componentDidMount()
  {
    if ( this.props.active )
    {
      this.startObserving();
    }
  }

  /**
   * Update observer state on prop changes
   *
   * @memberOf Visible
   */
  componentWillReceiveProps( nextProps )
  {
    if ( nextProps.active && !this.props.active )
    {
      this.startObserving();
    }
    if ( !nextProps.active && this.props.active )
    {
      this.stopObserving();
    }
  }

  /**
   * Stop the observer on unmounting
   *
   * @memberOf Visible
   */
  componentWillUnmount()
  {
    this.observer.disconnect();
  }

  /**
   * Render component
   *
   * @returns {JSX}
   *
   * @memberOf Visible
   */
  render()
  {
    const { className } = this.props;
    return (
      <span className={ className } ref={ node => this.node = node }>
        { this.props.children }
      </span>
    );
  }
}
