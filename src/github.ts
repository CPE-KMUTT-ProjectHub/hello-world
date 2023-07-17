import { Octokit } from 'octokit'
import dotenv from 'dotenv'
import { fail } from './invites'

dotenv.config()

const GH_ORG = process.env.GH_ORG

const octokit = new Octokit({ auth: process.env.GH_TOKEN })

// Get all members inside orgs

export const getOrgMembers = async (): Promise<string[]> => {
  const { data } = await octokit.request('GET /orgs/{org}/members', {
    org: GH_ORG,
  })

  const usernames = data.map(({ login }) => login)
  return usernames
}

// Invite outsider to orgs

// If members is exists -> return false
// If not -> invite user -> return true
export const inviteUserToOrg = async (username: string) => {
  const members = await getOrgMembers()

  if (members.includes(username)) console.log(`${username} is already exists, passing.`)
  else {
    const { data } = await octokit.request('PUT /orgs/{org}/memberships/{username}', {
      org: GH_ORG,
      username: username,
      role: 'member',
    })
  
    console.log(`invited ${data.user.login} to ${GH_ORG} as ${data.role}`)
  }
}
