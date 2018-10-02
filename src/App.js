import './App.css';
import { Component } from 'inferno';

const ListItem = props => (
  <div
    className={props.index % 2 ? 'item odd' : 'item even'}
    style={{ top: Scroller.ITEM_HEIGHT * props.index }}
  >
    List Item {props.index + 1}
  </div>
);

class Scroller extends Component {
  static get ITEM_HEIGHT() {
    return 48;
  }

  static get CONTAINER_HEIGHT() {
    return 400;
  }

  static get BUFFER() {
    return Scroller.ITEM_HEIGHT;
  }

  constructor() {
    super();
    this.isInView = this.isInView.bind(this);
    this.rafLoop = this.rafLoop.bind(this);
    this.setScrollPosition = this.setScrollPosition.bind(this);

    this.items = new Array(1000).fill(1);

    this.state = {
      lastScroll: 0
    };
  }

  isInView(index) {
    if (
      (index + 1) * Scroller.ITEM_HEIGHT > this.state.lastScroll - Scroller.BUFFER &&
      (index + 1) * Scroller.ITEM_HEIGHT <
        this.state.lastScroll + Scroller.CONTAINER_HEIGHT + Scroller.BUFFER
    ) {
      return true;
    }
  }

  setScrollPosition() {
    const scrollTop = this.scrollContainer.scrollTop;

    if (scrollTop !== this.state.lastScroll) {
      this.setState(() => ({
        lastScroll: scrollTop
      }));
    }
  }

  rafLoop() {
    this.setScrollPosition();
    return requestAnimationFrame(this.rafLoop);
  }

  componentDidMount() {
    this.scrollContainer = document.querySelector('.container');
    this.rafLoop();
  }

  render() {
    return (
      <div className="container">
        <div
          className="itemWrapper"
          style={{ height: Scroller.ITEM_HEIGHT * this.items.length }}
        >
          {this.items.map((item, index) => {
            if (this.isInView(index)) {
              return <ListItem key={index} index={index} />;
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

export default Scroller;
