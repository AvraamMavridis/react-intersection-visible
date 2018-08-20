const path = require('path');

module.exports = {
  require: [
    'babel-polyfill',
    path.join(__dirname, './styles.css')
  ],
  components: 'src/index.js',
  exampleMode: 'expand',
  usageMode: 'expand',
  title: 'IntersectionVisible',
  styleguideDir: path.join(__dirname, '/'),
  ribbon: {
    // Link to open on the ribbon click (required)
    url: 'https://github.com/AvraamMavridis/react-intersection-visible',
    // Text to show on the ribbon (optional)
    text: 'Fork me on GitHub'
  },
  showSidebar: false,
  theme: {
    color: {
      base: '#001514',
      light: '#001514',
      lightest: '#001514',
      name: '#001514',
      type: '#001514',
      error: '#001514',
      ribbonBackground: '#001514',
      link: '#001514',
      linkHover: '#001514',
      border: '#001514'
    }
  },
  editorConfig: {
    theme: 'dracula',
  }
};
