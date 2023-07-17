import { inviteUserToOrg } from './github'

export const member = (username: string) => {
  inviteUserToOrg(username)
}

export const fail = async () => {
  process.exit(1)
}
