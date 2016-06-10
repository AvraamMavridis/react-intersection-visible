import React, { PropTypes, Component } from 'react';

const intersectionObserver = Symbol( 'intersectionObserver' );

export default class Visible extends Component
{
    static propTypes = {
        onIntersect : PropTypes.func.isRequired,
        onShow      : PropTypes.func,
        onHide      : PropTypes.func,
        options     : PropTypes.shape( {
            root       : PropTypes.node,
            rootMargin : PropTypes.number,
            threshold  : PropTypes.oneOfType( PropTypes.number, PropTypes.array )
        } )
    };

    componentWillMount()
    {
        const { onIntersect, onShow, onHide, options={} } = this.props;

        const intersect = entries => {

            const { intersectionRect } = entries[ 0 ];
            const { top, left, bottom, right } = intersectionRect;

            if( [ top, bottom, left, right ].some( Boolean ) && onShow )
            {
                onShow( entries );
            }
            else if( onHide )
            {
                onHide( entries );
            }

            onIntersect( entries );
        };

        this[ intersectionObserver ] = new IntersectionObserver( intersect, options );
    }

    componentDidMount()
    {
        this[ intersectionObserver ].observe( this.refs.visible );
    }

    render()
    {

        return ( <span ref="visible">
                    { this.props.children }
                </span> );
    }
}
