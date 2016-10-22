import {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    date: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    title: {type: GraphQLString},
    content: {type: GraphQLString}
  }
});

export default postType;
