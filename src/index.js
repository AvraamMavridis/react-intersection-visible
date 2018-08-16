import 'intersection-observer';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Track the visitibity of the wrapped components
 *
 * <br>
 * [![codecov](https://codecov.io/gh/AvraamMavridis/react-intersection-visible/branch/master/graph/badge.svg)](https://codecov.io/gh/AvraamMavridis/react-intersection-visible) [![Build Status](https://travis-ci.org/AvraamMavridis/react-intersection-visible.svg?branch=master)](https://travis-ci.org/AvraamMavridis/react-intersection-visible) [![Greenkeeper badge](https://badges.greenkeeper.io/AvraamMavridis/react-intersection-visible.svg)](https://greenkeeper.io/)
 * <br>
 *
 * @export
 * @class IntersectionVisible
 * @extends {Component}
 */
export default class IntersectionVisible extends Component {
  static propTypes = {
    /** Enable/disable the component */
    active: PropTypes.bool,

    /** The wrapped component */
    children: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),

    /** Class passed to the wrapper */
    className: PropTypes.string,

    /**
     * Gets called when the wrapped component is visible
     *
     * @param {IntersectionObserverEntry} entries - <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry">Read more...</a>
     */
    onHide: PropTypes.func,

    /**
     * Gets called when wrapped component interesects
     *
     * @param {IntersectionObserverEntry} entries - <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry">Read more...</a>
     */
    onIntersect: PropTypes.func.isRequired,

    /**
     * Gets called when the wrapped component is visible
     *
     * @param {IntersectionObserverEntry} entries - <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry">Read more...</a>
     */
    onShow: PropTypes.func,

    /**
     * Options passed to configure the listener
    */
    options: PropTypes.shape({
      /** The element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null. */
      root: PropTypes.node,

      /**
       * Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.
      */
      rootMargin: PropTypes.number,
      /**
       * Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
      */
      threshold: PropTypes.oneOfType([ PropTypes.number, PropTypes.arrayOf(PropTypes.number) ])
    })
  };

  static defaultProps = {
    active: true,
    className: 'intersection-visible-wrapper',
    onHide: () => null,
    onShow: () => null,
    onIntersect: () => null,
  };

  /**
   * Handles the visibility changes
   *
   * @param {array} entries
   */
  handleObserverUpdate = entries => {
    const {
      onIntersect,
      onShow,
      onHide
    } = this.props;
    const {
      intersectionRect
    } = entries[0];
    const {
      top,
      left,
      bottom,
      right
    } = intersectionRect;

    if ([ top, bottom, left, right ].some(Boolean) && onShow) {
      onShow(entries);
    } else if (onHide) {
      onHide(entries);
    }

    onIntersect(entries);
  };

  /**
   * Starts the observer
   */
  startObserving() {
    this.observer.observe(this.node);
  }

  /**
   * Stops the observer
   */
  stopObserving() {
    this.observer.unobserve(this.node);
  }

  /**
   * Start the observer when the component is mounted
   */
  componentDidMount() {
    const {
      options
    } = this.props;
    this.observer = new IntersectionObserver(this.handleObserverUpdate, options);

    if (this.props.active) {
      this.startObserving();
    }
  }

  /**
   * Update observer state on prop changes
   */
  componentDidUpdate(prevProps) {
    if (this.props.active && !prevProps.active) {
      this.startObserving();
    }

    if (!this.props.active && prevProps.active) {
      this.stopObserving();
    }
  }

  /**
   * Stop the observer on unmounting
   */
  componentWillUnmount() {
    this.observer.disconnect();
  }

  /**
   * Render component
   *
   * @returns {JSX.Element}
   */
  render() {
    const {
      className
    } = this.props;
    return <div className={className} ref={node => this.node = node}>
      {this.props.children}
    </div>;
  }
}
