export {}

export type Roles = 'admin' | 'member' | 'support' | 'root'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}