export const getUserInitials = (username?: string | null) => {
    if (!username) return 'AB'
    return username.slice(0, 2).toUpperCase()
}