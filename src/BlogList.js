const DOM = React.DOM;

const Image = (props) => (DOM.img(props));
const TextBox = (props) => (
  DOM.span({ style: { border: '2px solid red' } }, props.string)
);

const BlogItem = (props) => (
  DOM.div(
    { style: { border: '3px solid green' } },
    React.createElement(Image, props.image),
    React.createElement(TextBox, props.text)
  )
);

const items = [
  {
    image: { src: "https://js.cx/gallery/img1-lg.jpg", width: "250px", height: "200px" },
    text: { string: "Here is the string for a TextBox" }
  },
  { 
    image: { src: "https://js.cx/gallery/img2-lg.jpg", width: "250px", height: "200px" },
    text: { string: "Second string for a TextBox" }
  },
  { 
    image: { src: "https://js.cx/gallery/img3-lg.jpg", width: "250px", height: "200px" },
    text: { string: "And the third string..." }
  }
];

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items };
  }

  render() {
    const { items } = this.state;
    return React.createElement(BlogList, { items });
  }
}

const BlogList = ({ items }) => (
  DOM.div(
    null,
    _.map(
      items,
      (item, key) =>(
        React.createElement(BlogItem, Object.assign({ key }, item))
      )
    )
  )
);

ReactDOM.render(
  React.createElement(BlogPage),
  document.getElementById('app')
);