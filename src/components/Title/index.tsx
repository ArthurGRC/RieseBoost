type TitleComponent = {
  content: string;
};

function Title({ content }: TitleComponent) {
  return <h1 className="text-2xl">{content}</h1>;
}
export default Title;
