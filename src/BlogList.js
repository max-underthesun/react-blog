// the final version
const { DOM, PropTypes } = React;
const { bind, assign } = _;
const update = React.addons.update;

const titleStyle = {
  border: '2px solid red',
  margin: '10px',
  padding: '10px',
  color: 'blue',
};

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
    id: 1,
    image: { src: "https://js.cx/gallery/img1-lg.jpg" },
    title: "First title",
    text: {
      post:
      `Here is the post for a TextBox. Here is the post for a TextBox.
      Here is the post for a TextBox. Here is the post for a TextBox.
      Here is the post for a TextBox. Here is the post for a TextBox.
      Here is the post for a TextBox. Here is the post for a TextBox.`
    },
    meta: {
      author: "Ivan Ivanich",
      createdAt: '2016-12-29T10:53:54.000Z',
      updatedAt: '2016-12-29T10:53:54.000Z',
      count: 5
    }
  },
  {
    id: 2,
    image: { src: "https://js.cx/gallery/img2-lg.jpg", width: "300px", height: "240px" },
    title: "Second title",
    text: { post: "Second post for a TextBox" },
    meta: {
      createdAt: '2016-12-29T10:53:54.000Z',
      updatedAt: '2016-12-29T10:53:54.000Z',
      count: 7
    }
  },
  {
    id: 3,
    image: { },
    title: "Third post",
    text: { },
    meta: {
      author: "Ivan Ivanich",
      createdAt: '2016-12-29T10:53:54.000Z',
      updatedAt: '2016-12-29T10:53:54.000Z',
      count: 13
    }
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

const TitleBox  = ({ title }) => (
  DOM.div(
    { style: titleStyle },
    DOM.h3(null, title)
  )
);

const BlogItem = ({ id, title, image, text, meta, like }) => (
  DOM.div(
    { style: blogItemStyle.outerWrapper },
    DOM.div(
      { style: blogItemStyle.postWrapper },
      React.createElement(TitleBox, { title }),
      React.createElement(Image, image),
      React.createElement(TextBox, text)
    ),
    DOM.br(null),
    React.createElement(MetaData, meta),
    React.createElement(Like, { meta, id, like })
  )
);

class MetaData extends React.Component {
  constructor(props) {
    super();
    this.state = { updatedAt: props.updatedAt };
  }

  render() {
    return React.createElement(
      MetaBox,
      {
        author: this.props.author,
        createdAt: dateFormattedMoment(this.props.createdAt),
        updatedAt: dateFormattedJS(this.state.updatedAt)
      }
    );
  }
}

BlogItem.propTypes = {
  image: PropTypes.shape(Image.propTypes).isRequired,
  text: PropTypes.shape(TextBox.propTypes).isRequired,
  meta: PropTypes.shape(MetaData.propTypes).isRequired
};

function dateFormattedMoment(
  dateStringISO,
  format = 'MMMM Do YYYY, h:mm:ss a'
) {
  return moment(dateStringISO).format(format);
}

function dateFormattedJS(
  dateStringISO,
  format = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  },
  locale = "en-US"
) {
  return new Date(dateStringISO).toLocaleString(locale, format);
}

MetaData.propTypes = {
  author: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string
};

MetaData.defaultProps = {
  author: "** anonimus **"
};

const MetaBox = ({ author, createdAt, updatedAt }) => (
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

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = bind(this.handleClick, this);
  }

  handleClick(e) {
    return this.props.like(this.props.id);
  }

  render() {
    return React.createElement(
      LikeBox,
      { count: this.props.meta.count, handleClick: this.handleClick }
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

    this.like = bind(this.like, this);
  }

  like(id) {
    const { items } = this.state;
    const index = items.findIndex(function(obj) { return obj.id == id; });
    this.setState({
      items: update(items, {[index]: {meta: {count: {$apply: function(x) {return x + 1;}}}}})
    });
  }

  render() {
    const { items } = this.state;
    return DOM.div(
      null,
      React.createElement(BlogList, { items, like: this.like }),
      React.createElement(
        PieChart,
        { columns: _.map(items, (item) => ([item.title, item.meta.count])) }
      )
    );
  }
}

const BlogList = ({ items, like }) => (
  DOM.div(
    null,
    _.map(
      items,
      (item) =>(
        React.createElement(BlogItem, Object.assign({ key: item.id }, item, { like }))
      )
    )
  )
);

class PieChart extends React.Component {
  componentDidMount() {
    this.chart = c3.generate({
      bindto: ReactDOM.findDOMNode(this.refs.chart),
      // bindto: '#chart',
      data: {
        columns: this.props.columns,
        type: "pie"
      }
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  componentWillReceiveProps(newProps) {
    this.chart.load({ columns: newProps.columns });
  }

  render() {
    return DOM.div({ ref: 'chart' });
    // return DOM.div({ id: 'chart' });
  }
}

ReactDOM.render(
  React.createElement(BlogPage),
  document.getElementById('app')
);
