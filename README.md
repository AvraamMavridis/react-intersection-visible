# react-intersection-visible
Experimental HOC-wrapper Component that helps you track when an element in your DOM enters the visible viewport. It uses the new [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)


[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

###How to use

1. Import `IntersectionVisible` hoc component
2. Wrap your main component with the `IntersectionVisible`
3. Provide the options and callbacks you want

###Example


```javascript
import React, { Component }   from 'react';
import ReactDOM               from 'react-dom';
import IntersectionVisible    from 'react-intersection-visible';

class YourComponent extends Component
{

    onHide( entries )
    {
        // do something
    }

    onShow( entries )
    {
        // do something
    }
    
    onIntersect( entries )
    {
        // do something
    }

    render(){
        return (<IntersectionVisible onIntersect={ e => this.onIntersect( e ) }
                                     onHide={ e => this.onHide( e ) }>
                                     onShow={ e => this.onShow( e ) }>
                    <div>
                        blah blah blah  blah blah blah  blah blah blah  blah blah
                          blah blah blah  blah blah blah  blah blah blah
                    </div>
                </IntersectionVisible>);
    }
}

  ```

###Options:

| Name        | Description           
| ------------- |-------------:|
| onIntersect    | Function that is called when the visibility status of the element change  |
| onHide    | Function that is called when the element becomes invisible |  
| onShow    | Function that is called when the element becomes visible  | 
| options    | Object, with the extras options supported by the IntersectionObserver API (root, rootMargin, threshold)|

More about the options [here](https://developers.google.com/web/updates/2016/04/intersectionobserver?hl=en)


###Changelog:

05-02-2017 Release version 1.1.0
11-06-2016 Release version 1.0.0

### Contribute

Any pull-request is more than welcome :boom: :smile:

### License

MIT

