import getProjection from 'helpers/get-projection';
import {
  GraphQLList
} from 'graphql';
import {paginationQueryArgs, paginateQuery, searchQuery} from 'helpers/query-pagination';

import postType from '../../types/post';
import PostModel from '../../models/post';

export default {
  type: new GraphQLList(postType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    const query = PostModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
