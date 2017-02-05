import React from 'react';
import ReactDOM from 'react-dom';
import IntersectionVisible from '../src/index';

class Example extends React.Component {

  state = {
    visible: false,
    active: true
  };

  onIntersect = () => {
    console.log('intersect');
  }

  onShow = () => {
    console.log('show');
    this.setState({ visible : true })
  };

  onHide = () => {
    console.log('hide');
    this.setState({ visible : false})
  };

  handleActiveCheckboxChange = (e) => {
    this.setState({ active: e.target.checked })
  };

  render() {
    const { visible, active } = this.state;
    const visibleState = visible ? "visible" : "invisible";
    return (
      <div>
        <div className={visibleState}>
          {visibleState}
          <label>
            <input type="checkbox"
                   checked={active}
                   onChange={this.handleActiveCheckboxChange}
            />
            Active
          </label>
        </div>

        <IntersectionVisible
          onIntersect={this.onIntersect}
          onShow={this.onShow}
          onHide={this.onHide}
          active={active}
          className="element">
          <div>{ visibleState }</div>
        </IntersectionVisible>
      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));
