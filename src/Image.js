const DOM = React.DOM;

const Image = (props) => (DOM.img(props));

ReactDOM.render(
  React.createElement(
    Image,
    {
      src: "https://js.cx/gallery/img1-lg.jpg",
      width: "500px",
      height: "400px",
      alt: "Large image"
    }
  ),
  document.getElementById('app')
);
