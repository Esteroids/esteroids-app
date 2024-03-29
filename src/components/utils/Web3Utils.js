export const truncateAddress = (address) => {
  if (!address) return 'No Account'
  const match = address.match(/^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}

export const getEnsContentHash = async (library, ethAddress) => {
  const resolver = await library.getResolver(ethAddress)
  if (resolver) {
    try {
      return await resolver.getContentHash()
    } catch (e) {
      return null
    }
  }
}
