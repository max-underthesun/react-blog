const DOM = React.DOM;

const TextBox = (props) => (
  DOM.span(
    { style: {border: '2px solid green'} },
    props.string
  )
);

ReactDOM.render(
  React.createElement(
    TextBox,
    { string: "Here is the string for a TextBox" }
  ),
  document.getElementById('text-box-div')
);
