// the final version
// const DOM = React.DOM;
const { DOM, PropTypes } = React;
const { bind, assign } = _;

// const Image = (props) => (DOM.img(props));
const imageStyle = {
  border: '2px solid red',
  margin: '10px',
  padding: '5px',
  maxWidth: '30%',
  // width: width,
  // width: '30%',
  // minWidth: width,
  // minWidth: props.width,
  // minHeight: height,
  // minHeight: props.height,
  // height: height,
  // height: '100%',
  display: 'inline-block'
};

const Image = ({ src, width, height }) => (
// const Image = (props) => (
  // DOM.div(
  //   { style:
  //     {
  //       border: '2px solid red',
  //       margin: '10px',
  //       padding: '5px',
  //       maxWidth: '30%',
  //       // width: width,
  //       // width: '30%',
  //       minWidth: width,
  //       // minWidth: props.width,
  //       minHeight: height,
  //       // minHeight: props.height,
  //       // height: height,
  //       // height: '100%',
  //       display: 'inline-block'
  //     }
  //   },
  DOM.div(
    { style: assign({}, imageStyle, { minWidth: width, minHeight: height }) },
    DOM.img({ src, width, height })
    // DOM.img(props)
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

const textBoxStyle = {
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
};

const TextBox = ({ post }) => (
  DOM.div(
    { style: textBoxStyle
      // {
      //   border: '2px solid red',
      //   margin: '10px',
      //   padding: '5px',
      //   width: '60%',
      //   // minWidth: '30%',
      //   // maxWidth: '50%',
      //   // maxWidth: '100%',
      //   // height: '100%',
      //   // position: 'relative',
      //   display: 'inline-block',
      //   verticalAlign: 'top'
      // }
    },
    post
  )
);

TextBox.propTypes = {
  post: PropTypes.string
};

TextBox.defaultProps = {
  post: "** empty entry **"
};

const blogItemStyle = {
  outerWrapper: { border: '3px solid green', margin: '10px', height: '100%' },
  postWrapper: { border: '3px solid orange', margin: '10px', height: '100%', overflow: 'hidden' }
};

const BlogItem = ({ image, text, meta }) => (
  DOM.div(
    // { style: { border: '3px solid green', margin: '10px', height: '100%' } },
    { style: blogItemStyle.outerWrapper },
    DOM.div(
      // { style: { border: '3px solid orange', margin: '10px', height: '100%', overflow: 'hidden' } },
      { style: blogItemStyle.postWrapper },
      React.createElement(Image, image),
      React.createElement(TextBox, text)
    ),
    // React.createElement(Image, props.image),
    // React.createElement(TextBox, props.text),
    DOM.br(null),
    React.createElement(MetaBox1, meta),
    React.createElement(MetaBox2, meta),
    React.createElement(MetaData1, meta),
    React.createElement(MetaData2, meta),
    React.createElement(Like, meta),
    React.createElement(Like2, meta)
  )
);

BlogItem.propTypes = {
  image: PropTypes.object,
  text: PropTypes.object,
  meta: PropTypes.object
};

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
    super();
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
  // constructor({ author, createdAt, updatedAt }) {
  // // constructor(props) {
  //   super();
  //   this.state = { author, createdAt, updatedAt };
  //   // this.state = props;
  //   // this.state = assign({}, props);
  // }

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
      updatedAt: this.props.updatedAt.toLocaleString("en-US", options)
      // author: this.state.author,
      // createdAt: this.state.createdAt.format('MMMM Do YYYY, h:mm:ss a'),
      // updatedAt: this.state.updatedAt.toLocaleString("en-US", options)
    };
    return props_formatted;
  }

  render() {
    return React.createElement(MetaBox3, this.props_formatted());
  }
}

const metaBoxStyle = { border: '2px solid blue', margin: '10px' };

const MetaBox3 = ({ author, createdAt, updatedAt }) => (
  DOM.div(
    // { style: { border: '2px solid blue', margin: '10px' } },
    { style: metaBoxStyle },
    React.createElement(MetaItem, { title: 'Author', value: author }),
    React.createElement(MetaItem, { title: 'Created', value: createdAt }),
    React.createElement(MetaItem, { title: 'Updated', value: updatedAt })
  )
);

MetaData2.propTypes = {
  author: PropTypes.string,
  createdAt: PropTypes.instanceOf(moment),
  updatedAt: PropTypes.instanceOf(Date)
};

MetaData2.defaultProps = {
  author: "** anonimus **"
};

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

const likeBoxStyle = {
  outerWrapper: { border: '1px solid magenta', margin: '10px' },
  title: { margin: '5px', fontWeight: 'bold' },
  count: { margin: '5px' }
};

const LikeBox = (props) => (
  DOM.span(
    // { style: { border: '1px solid magenta', margin: '10px' } },
    // DOM.span({ style: { margin: '5px', fontWeight: 'bold' } }, 'Like: '),
    // DOM.span({ style: { margin: '5px' } }, props.count),
    { style: likeBoxStyle.outerWrapper },
    DOM.span({ style: likeBoxStyle.title }, 'Like: '),
    DOM.span({ style: likeBoxStyle.count }, props.count),
    DOM.button({ onClick: props.handleClick }, '+')
  )
);

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
    // image: { src: "https://js.cx/gallery/img3-lg.jpg", width: "250px", height: "200px" },
    image: { },
    text: { },
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
