import type { apps } from './AppRegistry'
type IconKind = (typeof apps)[number]['icon']
export function Icon({ kind }: { kind: IconKind }) {
  return <span className={`pixel-icon icon-${kind}`} aria-hidden="true"><span /></span>
}
