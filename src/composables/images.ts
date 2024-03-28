import type { MaybeRef } from 'vue'

export const useImages = createSharedComposable(() => {
  const length = 16
  const promises = IMAGES.map(src => useImage({ src }))

  const reserve = ref([...IMAGES, ...VIDEOS].sort(() => Math.random() - 0.5))
  const feature = ref(Array.from({ length }, () => reserve.value.pop() as string))

  function next(stash: MaybeRef<string>) {
    stash = unref(stash)
    const next = reserve.value.splice(rand(reserve.value.length), 1)[0]
    const i = feature.value.indexOf(stash)
    feature.value[i] = next
    reserve.value = reserve.value.concat(stash)
    return next
  }

  function refresh() {
    reserve.value = [...IMAGES, ...VIDEOS].sort(() => Math.random() - 0.5)
    feature.value = Array.from({ length }, () => reserve.value.pop() as string)
  }

  return {
    promises,
    reserve,
    feature,
    next,
    refresh,
  }
})
