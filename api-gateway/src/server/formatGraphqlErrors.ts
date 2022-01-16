import { GraphQLError } from "graphql";

const formatGraphqlErrors = (error: GraphQLError) => {
  //@ts-ignore
  const errorDetails = error.originalError?.response?.body;

  try {
    if (errorDetails) return JSON.parse(errorDetails);
  } catch (error) {}

  if (error.message) return error.message;

  return null;
};

export default formatGraphqlErrors;
