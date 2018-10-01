import './App.css';
import { Component } from 'inferno';

class App extends Component {
  static get ITEM_HEIGHT() {
    return 48;
  }

  static get CONTAINER_HEIGHT() {
    return 400;
  }

  static get BUFFER() {
    return App.ITEM_HEIGHT * 2;
  }

  constructor() {
    super();
    this.isInView = this.isInView.bind(this);
    this.rafLoop = this.rafLoop.bind(this);
    this.setScrollPosition = this.setScrollPosition.bind(this);

    this.items = new Array(10000).fill(1);

    this.state = {
      lastScroll: 0
    };
  }

  isInView(index) {
    if (
      (index + 1) * App.ITEM_HEIGHT >
        this.state.lastScroll - App.BUFFER &&
      (index + 1) * App.ITEM_HEIGHT <
        this.state.lastScroll + App.CONTAINER_HEIGHT + App.BUFFER
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
    this.setScrollPosition();
    this.rafLoop();
  }

  render() {
    return (
      <div className="container">
        <div
          className="itemWrapper"
          style={{ height: App.ITEM_HEIGHT * this.items.length }}
        >
          {this.items.map((item, index) => {
            if (this.isInView(index)) {
              return (
                <div
                  className={index % 2 ? 'item odd' : 'item even'}
                  key={index}
                  style={{ top: App.ITEM_HEIGHT * index }}
                >
                  List Item {index + 1}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

export default App;
