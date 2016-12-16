const DOM = React.DOM;

const TextBox = (props) => (
  DOM.span(
    { style: { border: '2px solid red' } },
    props.post
  )
);

ReactDOM.render(
  React.createElement(
    TextBox,
    { post: "Here is the post for a TextBox" }
  ),
  document.getElementById('app')
);
