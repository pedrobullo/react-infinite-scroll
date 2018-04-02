import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  scrollFunc: PropTypes.func.isRequired,
  scrollAnchor: PropTypes.string, // Anchor .class or #id
  loading: PropTypes.bool,
};

export default function (InnerComponent) {
  class InfiniteScrollComponent extends React.Component {
    constructor(props) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
      this.anchor = false;
    }

    componentDidMount() {
      this.anchor = this.getAnchorElement() || window;
      this.anchor.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      this.anchor.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      if (!this.props.loading) {
        if (this.props.scrollAnchor) {
          const anchor = this.getAnchorElement();
          if (!anchor) {
            return console.log('[InifiteScroll] Bad anchor!');
          }
          if (anchor.scrollTop + anchor.clientHeight >= (anchor.scrollHeight - 120)) {
            this.props.scrollFunc();
          }
        } else {
          // MUST: Don't lock html/body on height: 100%
          if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 120)) {
            this.props.scrollFunc();
          }
        }
      }
      return true;
    }

    getAnchorElement() {
      const { scrollAnchor } = this.props;
      if (!scrollAnchor) {
        return false;
      }
      return scrollAnchor.includes('#') ?
        document.getElementById(scrollAnchor.replace('#', '')) :
        document.getElementsByClassName(scrollAnchor.replace('.', ''))[0];
    }

    render() {
      return <InnerComponent { ...this.props } />;
    }
  }

  InfiniteScrollComponent.need = InnerComponent.need; // TODO: map inner component custom property

  InfiniteScrollComponent.propTypes = propTypes;

  return InfiniteScrollComponent;
}
