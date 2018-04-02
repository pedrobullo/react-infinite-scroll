React Infinite Scroll
=====================

Clean and fast scroll listener wrapper component with callback

props:
- scrollFunc (function): callback. (required)
- scrollAnchor (string): element to listen scroll event. (default: window)
- loading (bool): flag to prevent multiple callback triggers (default: false)

```js
import infiniteScrollify from '...'
```

### Example - Wrapping up
```js
const PostList = ({ posts }) => (
  <ul>{posts.map(post => <li>{post.title}</li>)}</ul>
)
export default infiniteScrollify(PostList);
```

### Rendering - Simple
```js
<PostList posts={posts} scrollFunc={this.handleFetch()} />
```

### Example - with Redux
```js
class App extends React.Component {
  // ...
  <PostList posts={this.props.posts} loading={this.props.loading} />
  // ...
}

const mapStateToProps = state => ({
  posts: state.posts.list,
  loading: state.posts.isLoading
});

const mapDispatchToProps = {
  scrollFunc: () => fetchPosts(), // scrollFunc callback prop is required
};

export default connect(mapStateToProps, mapDispatchToProps)(infiniteScrollify(App));
```

### TODOS
- Tests
- npm

