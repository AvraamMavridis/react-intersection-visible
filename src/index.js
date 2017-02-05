import React, { PropTypes, Component } from 'react';

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
  };

  componentWillMount()
  {
    const { options } = this.props;
    this.observer = new IntersectionObserver( this.handleObserverUpdate, options );
  }

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

  startObserving()
  {
    this.observer.observe( this.refs.visible );
  }

  stopObserving()
  {
    this.observer.unobserve( this.refs.visible );
  }

  componentWillUnmount()
  {
    this.observer.disconnect();
  }

  componentDidMount()
  {
    if ( this.props.active )
    {
      this.startObserving();
    }
  }

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

  render()
  {
    const { className } = this.props;
    return ( <span className={className} ref="visible">{ this.props.children }</span> );
  }
}
