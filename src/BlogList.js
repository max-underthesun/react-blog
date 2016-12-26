// the final version
const { DOM, PropTypes } = React;
const { bind, assign } = _;

const imageStyle = {
  border: '2px solid red',
  margin: '10px',
  padding: '5px',
  maxWidth: '30%',
  display: 'inline-block'
};

const textBoxStyle = {
  border: '2px solid red',
  margin: '10px',
  padding: '5px',
  width: '60%',
  display: 'inline-block',
  verticalAlign: 'top'
};

const blogItemStyle = {
  outerWrapper: { border: '3px solid green', margin: '10px', height: '100%' },
  postWrapper: { border: '3px solid orange', margin: '10px', height: '100%', overflow: 'hidden' }
};

const metaBoxStyle = { border: '2px solid blue', margin: '10px' };

const metaItemStyle = {
  outerWrapper: { margin: '10px'},
  title: { color: 'grey'}
};

const likeBoxStyle = {
  outerWrapper: { border: '1px solid magenta', margin: '10px' },
  title: { margin: '5px', fontWeight: 'bold' },
  count: { margin: '5px' }
};

const items = [
  {
    image: { src: "https://js.cx/gallery/img1-lg.jpg" },
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
    image: { src: "https://js.cx/gallery/img2-lg.jpg", width: "300px", height: "240px" },
    text: { post: "Second post for a TextBox" },
    meta: { createdAt: moment(), updatedAt: new Date(), count: 7 }
  },
  {
    image: { },
    text: { },
    meta: { author: "Ivan Ivanich", createdAt: moment(), updatedAt: new Date(), count: 13 }
  }
];

const Image = ({ src, width, height }) => (
  DOM.div(
    { style: assign({}, imageStyle, { minWidth: width, minHeight: height }) },
    DOM.img({ src, width, height })
  )
);

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

Image.defaultProps = {
  src: "https://js.cx/gallery/img6-lg.jpg",
  width: "250px",
  height: "200px"
};

const TextBox = ({ post }) => (
  DOM.div({ style: textBoxStyle }, post)
);

TextBox.propTypes = {
  post: PropTypes.string
};

TextBox.defaultProps = {
  post: "** empty entry **"
};

const BlogItem = ({ image, text, meta }) => (
  DOM.div(
    { style: blogItemStyle.outerWrapper },
    DOM.div(
      { style: blogItemStyle.postWrapper },
      React.createElement(Image, image),
      React.createElement(TextBox, text)
    ),
    DOM.br(null),
    React.createElement(MetaData2, meta),
    React.createElement(Like2, meta)
  )
);

BlogItem.propTypes = {
  image: PropTypes.object,
  text: PropTypes.object,
  meta: PropTypes.object
};

class MetaData2 extends React.Component {
  constructor(props) {
    super();
    this.state = { updatedAt: props.updatedAt };
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
      author: this.props.author,
      createdAt: this.props.createdAt.format('MMMM Do YYYY, h:mm:ss a'),
      updatedAt: this.state.updatedAt.toLocaleString("en-US", options)
    };
    return props_formatted;
  }

  render() {
    return React.createElement(MetaBox3, this.props_formatted());
  }
}

MetaData2.propTypes = {
  author: PropTypes.string,
  createdAt: PropTypes.instanceOf(moment),
  updatedAt: PropTypes.instanceOf(Date)
};

MetaData2.defaultProps = {
  author: "** anonimus **"
};

const MetaBox3 = ({ author, createdAt, updatedAt }) => (
  DOM.div(
    { style: metaBoxStyle },
    React.createElement(MetaItem, { title: 'Author', value: author }),
    React.createElement(MetaItem, { title: 'Created', value: createdAt }),
    React.createElement(MetaItem, { title: 'Updated', value: updatedAt })
  )
);

const MetaItem = (props) => (
  DOM.p(
    { style: metaItemStyle.outerWrapper },
    DOM.span({ style: metaItemStyle.title }, `${props.title}: `),
    DOM.span(null, `${props.value}`)
  )
);

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
    { style: likeBoxStyle.outerWrapper },
    DOM.span({ style: likeBoxStyle.title }, 'Like: '),
    DOM.span({ style: likeBoxStyle.count }, props.count),
    DOM.button({ onClick: props.handleClick }, '+')
  )
);

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
