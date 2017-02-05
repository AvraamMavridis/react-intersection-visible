/* eslint-disable no-unused-vars */
import React, { PropTypes, Component } from 'react';
/* eslint-enable no-unused-vars */
import Visible from '../src/index.js';
import { mount } from 'enzyme';

window.IntersectionObserver = jest.fn().mockImplementation( () =>
{
  return {
    observe    : jest.fn(),
    unobserve  : jest.fn(),
    disconnect : jest.fn(),
  };
} );

describe( '<Visible />', () =>
{
  it( 'should have a wrapper span with the passed className', () =>
  {
    const onIntersect = jest.fn();
    const wrapper = mount( <Visible className="visible" onIntersect={ onIntersect } /> );
    const span = wrapper.find( 'span' );
    expect( span.length ).toBe( 1 );
    expect( span.prop( 'className' ) ).toBe( 'visible' );
  } );

  it( 'should have an observer', () =>
  {
    const onIntersect = jest.fn();
    const wrapper = mount( <Visible className="visible" onIntersect={ onIntersect } /> );
    const observer = wrapper.instance().observer;
    expect( observer ).toBeDefined();
  } );

  it( 'should start observing if active prop is true', () =>
  {
    const onIntersect = jest.fn();
    Visible.prototype.startObserving = jest.fn();
    const wrapper = mount( <Visible active className="visible" onIntersect={ onIntersect } /> );
    wrapper.instance().startObserving = jest.fn();
    expect( Visible.prototype.startObserving ).toHaveBeenCalled();
    Visible.prototype.startObserving.mockReset();
  } );

  it( 'should not start observing if active prop is false', () =>
  {
    const onIntersect = jest.fn();
    Visible.prototype.startObserving = jest.fn();
    const wrapper = mount( <Visible active={ false } className="visible" onIntersect={ onIntersect } /> );
    wrapper.instance().startObserving = jest.fn();
    expect( Visible.prototype.startObserving ).not.toHaveBeenCalled();
  } );

  it( 'should disconect observer onComponentUnmount', () =>
  {
    const onIntersect = jest.fn();
    const wrapper = mount( <Visible active={ false } className="visible" onIntersect={ onIntersect } /> );
    const instance = wrapper.instance();
    wrapper.unmount();
    expect( instance.observer.disconnect ).toHaveBeenCalled();
  } );

  it( 'should call unobserve of the observer, when stopObserving is called', () =>
  {
    const onIntersect = jest.fn();
    const wrapper = mount( <Visible active={ false } className="visible" onIntersect={ onIntersect } /> );
    const instance = wrapper.instance();
    instance.stopObserving();
    expect( instance.observer.unobserve ).toHaveBeenCalled();
  } );

  it( 'should start observing on props change if active is true', () =>
  {
    const onIntersect = jest.fn();
    const wrapper = mount( <Visible active={ false } className="visible" onIntersect={ onIntersect } /> );
    const instance = wrapper.instance();
    instance.startObserving = jest.fn();
    wrapper.setProps( { active : true } );
    expect( instance.startObserving ).toHaveBeenCalled();
  } );

  it( 'should stop observing on props change if active is false', () =>
  {
    const onIntersect = jest.fn();
    const wrapper = mount( <Visible active className="visible" onIntersect={ onIntersect } /> );
    const instance = wrapper.instance();
    instance.stopObserving = jest.fn();
    wrapper.setProps( { active : false } );
    expect( instance.stopObserving ).toHaveBeenCalled();
  } );

  it( 'should stop observing on props change if active is false', () =>
  {
    const onIntersect = jest.fn();
    const onShow = jest.fn();
    const wrapper = mount( <Visible active className="visible" onShow={ onShow } onIntersect={ onIntersect } /> );
    const instance = wrapper.instance();
    instance.handleObserverUpdate( [ { intersectionRect : { top : 1, bottom : 1, left : 1, right : 1 } } ] );
    expect( onShow ).toHaveBeenCalled();
  } );

  it( 'should stop observing on props change if active is false', () =>
  {
    const onIntersect = jest.fn();
    const onHide = jest.fn();
    const wrapper = mount( <Visible active className="visible" onHide={ onHide } onIntersect={ onIntersect } /> );
    const instance = wrapper.instance();
    instance.handleObserverUpdate( [ { intersectionRect : { top : 0, bottom : 0, left : 0, right : 0 } } ] );
    expect( onHide ).toHaveBeenCalled();
  } );

  it( 'should stop observing on props change if active is false', () =>
  {
    const onIntersect = jest.fn();
    const wrapper = mount( <Visible active className="visible" onIntersect={ onIntersect } /> );
    const instance = wrapper.instance();
    instance.handleObserverUpdate( [ { intersectionRect : { top : 0, bottom : 0, left : 0, right : 0 } } ] );
    expect( onIntersect ).toHaveBeenCalled();
  } );

} );
