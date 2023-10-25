export default interface TextInputPropsInterface {
  placeholder: string,
  value: string,
  isSecret: boolean,
  onChangeTextCallback: (text: string) => void
}