const DOM = React.DOM;

const Image = (props) => (DOM.img(props));
const TextBox = (props) => (
  DOM.span({ style: { border: '2px solid red' } }, props.post)
);

const BlogItem = (props) => (
  DOM.div(
    { style: { border: '3px solid green' } },
    React.createElement(Image, props.image),
    React.createElement(TextBox, props.text)
  )
);

ReactDOM.render(
  DOM.div(
    null,
    React.createElement(
      BlogItem,
      {
        image: { src: "https://js.cx/gallery/img1-lg.jpg", width: "250px", height: "200px" },
        text: { post: "Here is the post for a TextBox" }
      }
    ),
    React.createElement(
      BlogItem,
      { 
        image: { src: "https://js.cx/gallery/img2-lg.jpg", width: "250px", height: "200px" },
        text: { post: "Second post for a TextBox" }
      }
    ),
    React.createElement(
      BlogItem,
      { 
        image: { src: "https://js.cx/gallery/img3-lg.jpg", width: "250px", height: "200px" },
        text: { post: "And the third post..." }
      }
    )
  ),
  document.getElementById('app')
);
