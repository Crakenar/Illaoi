export default interface ButtonIlPropsInterface {
  text: string,
  onPressCallback: () => void,
  disabled?: boolean,
  loading?: boolean
}