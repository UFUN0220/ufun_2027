import { graphql, type GraphQlQueryResponseData } from '@octokit/graphql'
import type { GithubRepository, GithubRepositoryCommit } from '~/types/data'

type Edge<T> = {
  node: T
}

type RawRepository = Omit<GithubRepository, 'languages' | 'repositoryTopics'> & {
  defaultBranchRef?: {
    target: {
      history: {
        edges: Edge<GithubRepositoryCommit>[]
      }
    }
  }
  languages: {
    edges: Edge<{ color: string; name: string }>[]
  }
  repositoryTopics: {
    edges: Edge<{ topic: { name: string } }>[]
  }
}

const HISTORY_QUERY = `
  defaultBranchRef {
    target {
      ... on Commit {
        history(first: 1) {
          edges {
            node {
              ... on Commit {
                id
                abbreviatedOid
                committedDate
                message
                url
                status {
                  state
                }
              }
            }
          }
        }
      }
    }
  }
`

export async function fetchRepoData({
  repo,
  includeLastCommit = false,
}: {
  repo: string
  includeLastCommit?: boolean
}): Promise<GithubRepository | null> {
  if (!process.env.GITHUB_API_TOKEN || !repo) {
    console.error('Missing `GITHUB_API_TOKEN` or `repo`')
    return null
  }
  try {
    const { repository: rawRepository }: GraphQlQueryResponseData = await graphql(
      `
        query repository($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            stargazerCount
            description
            homepageUrl
            ${includeLastCommit ? HISTORY_QUERY : ''}
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                node {
                  color
                  name
                }
              }
            }
            name
            nameWithOwner
            url
            forkCount
            repositoryTopics(first: 20) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      `,
      {
        owner: repo.split('/')[0],
        repo: repo.split('/')[1],
        headers: {
          authorization: `token ${process.env.GITHUB_API_TOKEN}`,
        },
      }
    )
    const repository = rawRepository as RawRepository
    const lastCommit = includeLastCommit
      ? repository.defaultBranchRef?.target.history.edges[0]?.node
      : undefined
    if (includeLastCommit) {
      delete repository.defaultBranchRef
    }
    const languages = repository.languages.edges.map((edge) => {
      return {
        color: edge.node.color,
        name: edge.node.name,
      }
    })
    const repositoryTopics = repository.repositoryTopics.edges.map(
      (edge) => edge.node.topic.name
    )
    return {
      ...repository,
      languages,
      repositoryTopics,
      ...(lastCommit && { lastCommit }),
    }
  } catch (err) {
    console.error(err)
    return null
  }
}
