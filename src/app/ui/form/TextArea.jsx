import Input from './Input';

export default function TextArea(props) {
  return <Input {...{ ...props, type: 'textarea' }} />;
}
