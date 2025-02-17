import { useMemo } from "react"
import { Requirement } from "temporaryData/types"
import pluralize from "utils/pluralize"

const useRequirementLabels = (requirements?: Array<Requirement>): string => {
  const shoulRenderSymbols = useMemo(() => {
    if (!requirements?.length) return false

    const requirementTypesSet = new Set(
      requirements.map((requirement) => requirement.type)
    )
    if (requirementTypesSet.size > requirements.length) return false

    // If there are multiple requirements with the same type, don't render symbols, just render e.g. "2 TOKENs"
    return true
  }, [requirements])

  const baseReqs = shoulRenderSymbols
    ? requirements.map((requirement, i) => {
        if (!["POAP", "MIRROR", "SNAPSHOT"].includes(requirement.type))
          return ["ERC20", "COIN"].includes(requirement.type)
            ? `${requirement.value} ${requirement.symbol}`
            : `${
                requirement.symbol === "-" &&
                requirement.address?.toLowerCase() ===
                  "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"
                  ? "ENS"
                  : requirement.symbol
              }`
      })
    : ["ERC20", "COIN", "ERC721"].map((requirementType) => {
        const count =
          requirements?.filter((r) => r.type === requirementType).length || 0

        if (count > 0) return pluralize(count, requirementType)
      })

  const poapReqs = (() => {
    // We always display POAPs this way, because they have long names
    const poapRequirementsCount =
      requirements?.filter((req) => req.type === "POAP").length || 0
    if (poapRequirementsCount) return pluralize(poapRequirementsCount, "POAP")
  })()

  const mirrorReqs = (() => {
    // We always display Mirror editions this way, because they have long names
    const mirrorRequirementsCount =
      requirements?.filter((req) => req.type === "MIRROR").length || 0
    if (mirrorRequirementsCount)
      return pluralize(mirrorRequirementsCount, "Mirror Edition")
  })()

  const snapshotReqs = (() => {
    // We always display SNAPSHOTs this way, because they have long names
    const snapshotRequirementsCount =
      requirements?.filter((req) => req.type === "SNAPSHOT").length || 0
    if (snapshotRequirementsCount)
      return pluralize(snapshotRequirementsCount, "SNAPSHOT")
  })()

  return [...baseReqs, poapReqs, mirrorReqs, snapshotReqs].filter(Boolean).join(", ")
}

export default useRequirementLabels
