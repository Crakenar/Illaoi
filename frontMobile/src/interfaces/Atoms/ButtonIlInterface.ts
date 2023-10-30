export default interface ButtonIlPropsInterface {
  text: string,
  onPressCallback: () => void,
  style?: any,
  disabled?: boolean,
  loading?: boolean
}