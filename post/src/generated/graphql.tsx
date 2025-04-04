import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AiResponse = {
  __typename?: 'AIResponse';
  retrievedHelps?: Maybe<Array<Help>>;
  retrievedPosts?: Maybe<Array<Post>>;
  suggestedQuestions: Array<Scalars['String']['output']>;
  text: Scalars['String']['output'];
};

export type AuthorResponse = {
  __typename?: 'AuthorResponse';
  userId: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type Help = {
  __typename?: 'Help';
  Author: Scalars['String']['output'];
  Description: Scalars['String']['output'];
  Location: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  isResolved: Scalars['Boolean']['output'];
  updatedAt: Scalars['String']['output'];
  volunteers?: Maybe<Array<Scalars['String']['output']>>;
  volunteersIds: Array<Scalars['String']['output']>;
};

export type HelpInput = {
  Author: Scalars['String']['input'];
  Description: Scalars['String']['input'];
  Location: Scalars['String']['input'];
  isResolved: Scalars['Boolean']['input'];
  volunteers: Array<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addVolunteer: Scalars['Boolean']['output'];
  createHelp: Help;
  createPost: Post;
  deleteHelp: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  updateHelp: Help;
  updatePost: Post;
};


export type MutationAddVolunteerArgs = {
  id: Scalars['String']['input'];
  volunteerId: Scalars['String']['input'];
};


export type MutationCreateHelpArgs = {
  input: HelpInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeleteHelpArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateHelpArgs = {
  id: Scalars['String']['input'];
  input: HelpInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['String']['input'];
  input: PostInput;
};

export type Post = {
  __typename?: 'Post';
  AiSummary?: Maybe<Scalars['String']['output']>;
  Author: Scalars['String']['output'];
  Category: Scalars['String']['output'];
  Content: Scalars['String']['output'];
  Title: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PostInput = {
  AiSummary?: InputMaybe<Scalars['String']['input']>;
  Author: Scalars['String']['input'];
  Category: Scalars['String']['input'];
  Content: Scalars['String']['input'];
  Title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  communityAIQuery?: Maybe<AiResponse>;
  getAuthor?: Maybe<AuthorResponse>;
  help?: Maybe<Help>;
  helps?: Maybe<Array<Help>>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
};


export type QueryCommunityAiQueryArgs = {
  input: Scalars['String']['input'];
};


export type QueryHelpArgs = {
  id: Scalars['String']['input'];
};


export type QueryPostArgs = {
  id: Scalars['String']['input'];
};

export type AddVolunteerMutationVariables = Exact<{
  id: Scalars['String']['input'];
  volunteerId: Scalars['String']['input'];
}>;


export type AddVolunteerMutation = { __typename?: 'Mutation', addVolunteer: boolean };

export type CreateHelpMutationVariables = Exact<{
  input: HelpInput;
}>;


export type CreateHelpMutation = { __typename?: 'Mutation', createHelp: { __typename?: 'Help', _id: string, Author: string, Description: string, Location: string, isResolved: boolean, volunteers?: Array<string> | null, createdAt: string, updatedAt: string } };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', _id: string, Author: string, Title: string, Content: string, Category: string, AiSummary?: string | null, createdAt: string, updatedAt: string } };

export type DeleteHelpMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteHelpMutation = { __typename?: 'Mutation', deleteHelp: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type UpdateHelpMutationVariables = Exact<{
  input: HelpInput;
  id: Scalars['String']['input'];
}>;


export type UpdateHelpMutation = { __typename?: 'Mutation', updateHelp: { __typename?: 'Help', _id: string, Author: string, Description: string, Location: string, isResolved: boolean, volunteers?: Array<string> | null, createdAt: string, updatedAt: string } };

export type UpdatePostMutationVariables = Exact<{
  input: PostInput;
  id: Scalars['String']['input'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', _id: string, Author: string, Title: string, Content: string, Category: string, AiSummary?: string | null, createdAt: string, updatedAt: string } };

export type CommunityAiQueryQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type CommunityAiQueryQuery = { __typename?: 'Query', communityAIQuery?: { __typename?: 'AIResponse', text: string, suggestedQuestions: Array<string>, retrievedPosts?: Array<{ __typename?: 'Post', _id: string, Author: string, Title: string, Content: string, Category: string }> | null, retrievedHelps?: Array<{ __typename?: 'Help', _id: string, Author: string, Description: string, Location: string }> | null } | null };

export type GetAuthorQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorQuery = { __typename?: 'Query', getAuthor?: { __typename?: 'AuthorResponse', userId: string, userName: string } | null };

export type HelpsQueryVariables = Exact<{ [key: string]: never; }>;


export type HelpsQuery = { __typename?: 'Query', helps?: Array<{ __typename?: 'Help', _id: string, Author: string, Description: string, Location: string, isResolved: boolean, volunteers?: Array<string> | null, volunteersIds: Array<string>, createdAt: string, updatedAt: string }> | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', _id: string, Author: string, Title: string, Content: string, Category: string, AiSummary?: string | null, createdAt: string, updatedAt: string }> | null };


export const AddVolunteerDocument = gql`
    mutation AddVolunteer($id: String!, $volunteerId: String!) {
  addVolunteer(id: $id, volunteerId: $volunteerId)
}
    `;
export type AddVolunteerMutationFn = Apollo.MutationFunction<AddVolunteerMutation, AddVolunteerMutationVariables>;

/**
 * __useAddVolunteerMutation__
 *
 * To run a mutation, you first call `useAddVolunteerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVolunteerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVolunteerMutation, { data, loading, error }] = useAddVolunteerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      volunteerId: // value for 'volunteerId'
 *   },
 * });
 */
export function useAddVolunteerMutation(baseOptions?: Apollo.MutationHookOptions<AddVolunteerMutation, AddVolunteerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddVolunteerMutation, AddVolunteerMutationVariables>(AddVolunteerDocument, options);
      }
export type AddVolunteerMutationHookResult = ReturnType<typeof useAddVolunteerMutation>;
export type AddVolunteerMutationResult = Apollo.MutationResult<AddVolunteerMutation>;
export type AddVolunteerMutationOptions = Apollo.BaseMutationOptions<AddVolunteerMutation, AddVolunteerMutationVariables>;
export const CreateHelpDocument = gql`
    mutation CreateHelp($input: HelpInput!) {
  createHelp(input: $input) {
    _id
    Author
    Description
    Location
    isResolved
    volunteers
    createdAt
    updatedAt
  }
}
    `;
export type CreateHelpMutationFn = Apollo.MutationFunction<CreateHelpMutation, CreateHelpMutationVariables>;

/**
 * __useCreateHelpMutation__
 *
 * To run a mutation, you first call `useCreateHelpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHelpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHelpMutation, { data, loading, error }] = useCreateHelpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHelpMutation(baseOptions?: Apollo.MutationHookOptions<CreateHelpMutation, CreateHelpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHelpMutation, CreateHelpMutationVariables>(CreateHelpDocument, options);
      }
export type CreateHelpMutationHookResult = ReturnType<typeof useCreateHelpMutation>;
export type CreateHelpMutationResult = Apollo.MutationResult<CreateHelpMutation>;
export type CreateHelpMutationOptions = Apollo.BaseMutationOptions<CreateHelpMutation, CreateHelpMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    _id
    Author
    Title
    Content
    Category
    AiSummary
    createdAt
    updatedAt
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteHelpDocument = gql`
    mutation DeleteHelp($id: String!) {
  deleteHelp(id: $id)
}
    `;
export type DeleteHelpMutationFn = Apollo.MutationFunction<DeleteHelpMutation, DeleteHelpMutationVariables>;

/**
 * __useDeleteHelpMutation__
 *
 * To run a mutation, you first call `useDeleteHelpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHelpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHelpMutation, { data, loading, error }] = useDeleteHelpMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHelpMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHelpMutation, DeleteHelpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHelpMutation, DeleteHelpMutationVariables>(DeleteHelpDocument, options);
      }
export type DeleteHelpMutationHookResult = ReturnType<typeof useDeleteHelpMutation>;
export type DeleteHelpMutationResult = Apollo.MutationResult<DeleteHelpMutation>;
export type DeleteHelpMutationOptions = Apollo.BaseMutationOptions<DeleteHelpMutation, DeleteHelpMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UpdateHelpDocument = gql`
    mutation UpdateHelp($input: HelpInput!, $id: String!) {
  updateHelp(input: $input, id: $id) {
    _id
    Author
    Description
    Location
    isResolved
    volunteers
    createdAt
    updatedAt
  }
}
    `;
export type UpdateHelpMutationFn = Apollo.MutationFunction<UpdateHelpMutation, UpdateHelpMutationVariables>;

/**
 * __useUpdateHelpMutation__
 *
 * To run a mutation, you first call `useUpdateHelpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHelpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHelpMutation, { data, loading, error }] = useUpdateHelpMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateHelpMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHelpMutation, UpdateHelpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHelpMutation, UpdateHelpMutationVariables>(UpdateHelpDocument, options);
      }
export type UpdateHelpMutationHookResult = ReturnType<typeof useUpdateHelpMutation>;
export type UpdateHelpMutationResult = Apollo.MutationResult<UpdateHelpMutation>;
export type UpdateHelpMutationOptions = Apollo.BaseMutationOptions<UpdateHelpMutation, UpdateHelpMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($input: PostInput!, $id: String!) {
  updatePost(input: $input, id: $id) {
    _id
    Author
    Title
    Content
    Category
    AiSummary
    createdAt
    updatedAt
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CommunityAiQueryDocument = gql`
    query CommunityAIQuery($input: String!) {
  communityAIQuery(input: $input) {
    text
    suggestedQuestions
    retrievedPosts {
      _id
      Author
      Title
      Content
      Category
    }
    retrievedHelps {
      _id
      Author
      Description
      Location
    }
  }
}
    `;

/**
 * __useCommunityAiQueryQuery__
 *
 * To run a query within a React component, call `useCommunityAiQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityAiQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityAiQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommunityAiQueryQuery(baseOptions: Apollo.QueryHookOptions<CommunityAiQueryQuery, CommunityAiQueryQueryVariables> & ({ variables: CommunityAiQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityAiQueryQuery, CommunityAiQueryQueryVariables>(CommunityAiQueryDocument, options);
      }
export function useCommunityAiQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityAiQueryQuery, CommunityAiQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityAiQueryQuery, CommunityAiQueryQueryVariables>(CommunityAiQueryDocument, options);
        }
export function useCommunityAiQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CommunityAiQueryQuery, CommunityAiQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CommunityAiQueryQuery, CommunityAiQueryQueryVariables>(CommunityAiQueryDocument, options);
        }
export type CommunityAiQueryQueryHookResult = ReturnType<typeof useCommunityAiQueryQuery>;
export type CommunityAiQueryLazyQueryHookResult = ReturnType<typeof useCommunityAiQueryLazyQuery>;
export type CommunityAiQuerySuspenseQueryHookResult = ReturnType<typeof useCommunityAiQuerySuspenseQuery>;
export type CommunityAiQueryQueryResult = Apollo.QueryResult<CommunityAiQueryQuery, CommunityAiQueryQueryVariables>;
export const GetAuthorDocument = gql`
    query GetAuthor {
  getAuthor {
    userId
    userName
  }
}
    `;

/**
 * __useGetAuthorQuery__
 *
 * To run a query within a React component, call `useGetAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthorQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthorQuery, GetAuthorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorQuery, GetAuthorQueryVariables>(GetAuthorDocument, options);
      }
export function useGetAuthorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorQuery, GetAuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorQuery, GetAuthorQueryVariables>(GetAuthorDocument, options);
        }
export function useGetAuthorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAuthorQuery, GetAuthorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthorQuery, GetAuthorQueryVariables>(GetAuthorDocument, options);
        }
export type GetAuthorQueryHookResult = ReturnType<typeof useGetAuthorQuery>;
export type GetAuthorLazyQueryHookResult = ReturnType<typeof useGetAuthorLazyQuery>;
export type GetAuthorSuspenseQueryHookResult = ReturnType<typeof useGetAuthorSuspenseQuery>;
export type GetAuthorQueryResult = Apollo.QueryResult<GetAuthorQuery, GetAuthorQueryVariables>;
export const HelpsDocument = gql`
    query Helps {
  helps {
    _id
    Author
    Description
    Location
    isResolved
    volunteers
    volunteersIds
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useHelpsQuery__
 *
 * To run a query within a React component, call `useHelpsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelpsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelpsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelpsQuery(baseOptions?: Apollo.QueryHookOptions<HelpsQuery, HelpsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelpsQuery, HelpsQueryVariables>(HelpsDocument, options);
      }
export function useHelpsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelpsQuery, HelpsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelpsQuery, HelpsQueryVariables>(HelpsDocument, options);
        }
export function useHelpsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HelpsQuery, HelpsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HelpsQuery, HelpsQueryVariables>(HelpsDocument, options);
        }
export type HelpsQueryHookResult = ReturnType<typeof useHelpsQuery>;
export type HelpsLazyQueryHookResult = ReturnType<typeof useHelpsLazyQuery>;
export type HelpsSuspenseQueryHookResult = ReturnType<typeof useHelpsSuspenseQuery>;
export type HelpsQueryResult = Apollo.QueryResult<HelpsQuery, HelpsQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    _id
    Author
    Title
    Content
    Category
    AiSummary
    createdAt
    updatedAt
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export function usePostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsSuspenseQueryHookResult = ReturnType<typeof usePostsSuspenseQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;