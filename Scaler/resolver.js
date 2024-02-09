import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
function evenValue(value){
    if(typeof value === 'number' && Number.isInteger(value) && value%2==0){
        return value;
    }
    throw new GraphQLError('Provided value is not an Even integer', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
}
const resolvers = {
    Even:new GraphQLScalarType({
        name:"Even",
        description:'Only Takes Even number',
        parseValue:evenValue,
        serialize:evenValue,
        parseLiteral(ast){
            if(ast.kind === Kind.INT){
                return evenValue(parseInt(ast.value,10))
            }
            throw new GraphQLError('Give me only Integer value', {
                extensions: { code: 'BAD_USER_INPUT' },
              });
        }
    }),
    Query:{
        printEven(_,{even}){
            return even;
        }
    }
}
export {resolvers};