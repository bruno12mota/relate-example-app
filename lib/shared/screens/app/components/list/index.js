import React, {Component, PropTypes} from 'react';

import List from './list';
import bind from 'decorators/bind';
import {dataConnect} from 'relate-js';
import getLazyFilters from 'helpers/get-lazy-load-filters';

@dataConnect(
  (state) => ({
    currentId: state.router.params.id,
    search: state.router.location.query.s || ''
  }),
  (props) => ({
    fragments: List.fragments,
    variablesTypes: {
      posts: {
        sort: 'String',
        order: 'String',
        search: 'String',
        s: 'String',
        limit: 'Int',
        filters: '[Filter]'
      }
    },
    initialVariables: {
      posts: {
        sort: '_id',
        order: 'desc',
        search: 'title',
        s: props.search,
        limit: 15
      }
    },
    mutations: {
      addPost: [
        {
          type: 'PREPEND',
          field: 'posts'
        }
      ]
    }
  })
)
export default class ListContainer extends Component {
  static propTypes = {
    currentId: PropTypes.string,
    posts: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    search: PropTypes.string,
    relate: PropTypes.object
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.search !== this.props.search) {
      this.props.relate.refresh();
    }
  }

  @bind
  loadMore () {
    const {loading, relate} = this.props;

    if (!loading && relate.hasMore) {
      const {posts, search} = this.props;
      relate.loadMore({
        posts: {
          sort: '_id',
          order: 'desc',
          search: 'title',
          s: search,
          limit: 10,
          filters: getLazyFilters({
            items: posts,
            sort: '_id',
            order: 'desc'
          })
        }
      }, 'posts', 10);
    }
  }

  render () {
    const {posts, loading, currentId} = this.props;

    return (
      <List
        posts={posts}
        loading={loading}
        currentId={currentId}
        loadMore={this.loadMore}
      />
    );
  }
}
