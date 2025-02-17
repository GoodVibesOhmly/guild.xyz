import useUsersHallsGuildsIds from "components/index/hooks/useUsersHallsGuildsIds"

const useIsMember = (type: "hall" | "guild", id: number): boolean => {
  const { usersHallsIds, usersGuildsIds } = useUsersHallsGuildsIds()

  if (id === undefined) return undefined

  return type === "hall" ? usersHallsIds?.includes(id) : usersGuildsIds?.includes(id)
}

export default useIsMember
