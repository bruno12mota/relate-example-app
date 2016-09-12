import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import getProjection from '../../helpers/get-projection';
import postType from '../../types/post';
import PostModel from '../../models/post';

export default {
  type: postType,
  args: {
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, request, options) {
    const projection = getProjection(options.fieldASTs[0]);

    const post = await PostModel
      .findOne({
        slug: params.slug
      })
      .select(projection)
      .exec();

    if (!post) {
      throw new Error('Not post found');
    }

    return post;
  }
};
