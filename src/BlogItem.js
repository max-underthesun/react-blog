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

ReactDOM.render(
  React.createElement(
    BlogItem,
    {
      image: {
        src: "https://js.cx/gallery/img1-lg.jpg",
        width: "500px",
        height: "400px",
        alt: "Large image"
      },
      text: { string: "Here is the string for a TextBox" }
    }
  ),
  document.getElementById('blog-item-div')
);
