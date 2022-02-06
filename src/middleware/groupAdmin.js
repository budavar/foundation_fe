/* eslint-disable */
export default function groupAdmin ({ next, store }) {
  if (['owner', 'admin'].includes(store.getters["group/getGroupAuthority"])) next()
  else next({ name: "notFound" })
}
