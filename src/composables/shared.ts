export const useSharedScroll = createGlobalState(() => {
  const y = ref(0)
  return { y }
})
