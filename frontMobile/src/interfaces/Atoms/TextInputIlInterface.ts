export default interface TextInputPropsInterface {
  placeholder: string,
  value: string,
  isSecret?: boolean,
  keyboardType?: string,
  onChangeTextCallback: (text: string) => void
}