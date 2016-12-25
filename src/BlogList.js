// the final version
const DOM = React.DOM;

const Image = (props) => (DOM.img(props));
const TextBox = (props) => (
  DOM.span({ style: { border: '2px solid red', margin: '10px' } }, props.post)
);

const MetaItem = (props) => (
  // DOM.span({ style: { margin: '10px'} }, props)
  DOM.p({ style: { margin: '10px'} },
    DOM.span({ style: { color: 'grey'} }, `${props.title}: `),
    DOM.span(null, `${props.value}`)
  )
);

const MetaBox = (props) => (
  DOM.div(
    { style: { border: '2px solid blue', margin: '10px' } },
    // DOM.span({ style: { margin: '10px'} }, `Author: ${props.author}`),
    // DOM.span({ style: { margin: '10px'} }, `Created: ${props.createdAt}`),
    // DOM.span({ style: { margin: '10px'} }, `Updated: ${props.updatedAt}`)

    // React.createElement(MetaItem, `Author: ${props.author}`),
    // React.createElement(MetaItem, `Created: ${props.createdAt}`),
    // React.createElement(MetaItem, `Created: ${props.updatedAt}`)

    React.createElement(MetaItem, { title: 'Author', value: props.author }),
    React.createElement(MetaItem, { title: 'Created', value: props.createdAt.format('MMMM Do YYYY, h:mm:ss a') }),
    React.createElement(
      MetaItem,
      {
        title: 'Updated',
        value: props.updatedAt.toLocaleString(
          "en-US",
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          }
        )
      }
    )
  )
);

class MetaData extends React.Component {
  constructor(props) {
    super(props);
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    this.state = {};
    this.state.author = props.author;
    this.state.createdAt = props.createdAt.format('MMMM Do YYYY, h:mm:ss a');
    this.state.updatedAt = props.updatedAt.toLocaleString("en-US", options);
  }

  render() {
    const props = this.state;
    return React.createElement(MetaBox2, props);
  }
}

const MetaBox2 = (props) => (
  DOM.div(
    { style: { border: '2px solid blue', margin: '10px' } },
    React.createElement(MetaItem, { title: 'Author', value: props.author }),
    React.createElement(MetaItem, { title: 'Created', value: props.createdAt }),
    React.createElement(MetaItem, { title: 'Updated', value: props.updatedAt })
  )
);

const BlogItem = (props) => (
  DOM.div(
    { style: { border: '3px solid green', margin: '10px' } },
    React.createElement(Image, props.image),
    React.createElement(TextBox, props.text),
    DOM.br(null),
    React.createElement(MetaBox, props.meta),
    React.createElement(MetaData, props.meta)
  )
);

const items = [
  {
    image: { src: "https://js.cx/gallery/img1-lg.jpg", width: "250px", height: "200px" },
    text: { post: "Here is the post for a TextBox. Here is the post for a TextBox" },
    meta: { author: "Ivan Ivanich", createdAt: moment(), updatedAt: new Date() }
  },
  {
    image: { src: "https://js.cx/gallery/img2-lg.jpg", width: "250px", height: "200px" },
    text: { post: "Second post for a TextBox" },
    meta: { author: "Ivan Ivanich", createdAt: moment(), updatedAt: new Date() }
  },
  {
    image: { src: "https://js.cx/gallery/img3-lg.jpg", width: "250px", height: "200px" },
    text: { post: "And the third post..." },
    meta: { author: "Ivan Ivanich", createdAt: moment(), updatedAt: new Date() }
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
