export default interface TextInputPropsInterface {
  placeholder: string;
  isSecret?: boolean;
  keyboardType?: string;
  editable?: boolean;
  value?: string;
  onChangeTextCallback: (text: string) => void;
}
