// the final version
const DOM = React.DOM;
const { bind, assign } = _;

// const Image = (props) => (DOM.img(props));
const Image = ({ src, width, height }) => (
  DOM.div(
    { style:
      {
        border: '2px solid red',
        margin: '10px',
        padding: '5px',
        maxWidth: '30%',
        // width: width,
        // width: '30%',
        minWidth: width,
        minHeight: height,
        // height: height,
        // height: '100%',
        display: 'inline-block'
      }
    },
    DOM.img({ src, width, height })
  )
);

const TextBox = (props) => (
  DOM.div(
    { style:
      {
        border: '2px solid red',
        margin: '10px',
        padding: '5px',
        width: '60%',
        // minWidth: '30%',
        // maxWidth: '50%',
        // maxWidth: '100%',
        // height: '100%',
        // position: 'relative',
        display: 'inline-block',
        verticalAlign: 'top'
      }
    },
    props.post
  )
);

const BlogItem = (props) => (
  DOM.div(
    { style: { border: '3px solid green', margin: '10px', height: '100%' } },
    DOM.div(
      { style: { border: '3px solid orange', margin: '10px', height: '100%', overflow: 'hidden' } },
      React.createElement(Image, props.image),
      React.createElement(TextBox, props.text)
    ),
    // React.createElement(Image, props.image),
    // React.createElement(TextBox, props.text),
    DOM.br(null),
    React.createElement(MetaBox1, props.meta),
    React.createElement(MetaBox2, props.meta),
    React.createElement(MetaData1, props.meta),
    React.createElement(MetaData2, props.meta),
    React.createElement(Like, props.meta),
    React.createElement(Like2, props.meta)
  )
);

const MetaBox1 = (props) => (
  DOM.div(
    { style: { border: '2px solid blue', margin: '10px' } },
    DOM.p(
      { style: { margin: '10px'} },
      DOM.span({ style: { color: 'grey'} }, 'Author: '),
      DOM.span(null, `${props.author}`)
    ),
    DOM.p(
      { style: { margin: '10px'} },
      DOM.span({ style: { color: 'purple'} }, 'Created: '),
      DOM.span(null, `${props.createdAt.format('MMMM Do YYYY, h:mm:ss a')}`)
     ),
    DOM.p(
      { style: { margin: '10px'} },
      DOM.span({ style: { color: 'orange'} }, 'Updated: '),
      DOM.span(null, `${props.createdAt}`)
    )
  )
);

const MetaItem = (props) => (
  // DOM.span({ style: { margin: '10px'} }, props)
  DOM.p({ style: { margin: '10px'} },
  DOM.span({ style: { color: 'grey'} }, `${props.title}: `),
  DOM.span(null, `${props.value}`)
)
);

const MetaBox2 = (props) => (
  DOM.div(
    { style: { border: '2px solid blue', margin: '10px' } },
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

class MetaData1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    this.state = {};
    this.state = assign({}, props);
    this.state.author = props.author;
    this.state.createdAt = props.createdAt.format('MMMM Do YYYY, h:mm:ss a');
    this.state.updatedAt = props.updatedAt.toLocaleString("en-US", options);
  }

  render() {
    const props = this.state;
    return React.createElement(MetaBox3, props);
  }
}

class MetaData2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  props_formatted() {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    var props_formatted = {
      author: this.state.author,
      createdAt: this.state.createdAt.format('MMMM Do YYYY, h:mm:ss a'),
      updatedAt: this.state.updatedAt.toLocaleString("en-US", options)
    };
    return props_formatted;
  }

  render() {
    return React.createElement(MetaBox3, this.props_formatted());
  }
}

const MetaBox3 = (props) => (
  DOM.div(
    { style: { border: '2px solid blue', margin: '10px' } },
    React.createElement(MetaItem, { title: 'Author', value: props.author }),
    React.createElement(MetaItem, { title: 'Created', value: props.createdAt }),
    React.createElement(MetaItem, { title: 'Updated', value: props.updatedAt })
  )
);

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.count };

    this.handleClick = bind(this.handleClick, this);
  }

  handleClick(e) {
    const step = 1;
    this.setState({ count: this.state.count + step });
  }

  render() {
    return DOM.span(
      { style: { border: '1px solid magenta', margin: '10px' } },
      DOM.span({ style: { margin: '5px', fontWeight: 'bold' } }, 'Like: '),
      DOM.span({ style: { margin: '5px' } }, this.state.count),
      DOM.button({ onClick: this.handleClick }, '+')
    );
  }
}

class Like2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.count };

    this.handleClick = bind(this.handleClick, this);
  }

  handleClick(e) {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return React.createElement(
      LikeBox,
      { count: this.state.count, handleClick: this.handleClick }
    );
  }
}

const LikeBox = (props) => (
  DOM.span(
    { style: { border: '1px solid magenta', margin: '10px' } },
    DOM.span({ style: { margin: '5px', fontWeight: 'bold' } }, 'Like: '),
    DOM.span({ style: { margin: '5px' } }, props.count),
    DOM.button({ onClick: props.handleClick }, '+')
  )
);

const items = [
  {
    image: { src: "https://js.cx/gallery/img1-lg.jpg", width: "250px", height: "200px" },
    text: {
      post:
        `Here is the post for a TextBox. Here is the post for a TextBox.
         Here is the post for a TextBox. Here is the post for a TextBox.
         Here is the post for a TextBox. Here is the post for a TextBox.
         Here is the post for a TextBox. Here is the post for a TextBox.`
    },
    meta: { author: "Ivan Ivanich", createdAt: moment(), updatedAt: new Date(), count: 5 }
  },
  {
    image: { src: "https://js.cx/gallery/img2-lg.jpg", width: "250px", height: "200px" },
    text: { post: "Second post for a TextBox" },
    meta: { author: "Ivan Ivanich", createdAt: moment(), updatedAt: new Date(), count: 7 }
  },
  {
    image: { src: "https://js.cx/gallery/img3-lg.jpg", width: "250px", height: "200px" },
    text: { post: "And the third post..." },
    meta: { author: "Ivan Ivanich", createdAt: moment(), updatedAt: new Date(), count: 13 }
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
