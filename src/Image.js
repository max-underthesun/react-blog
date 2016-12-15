const DOM = React.DOM;

const Image = (props) => (
  DOM.img(
    {
      src: props.src,
      width: props.width,
      height: props.height,
      style: {border: '1px solid red'}
    }
  )
);

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
