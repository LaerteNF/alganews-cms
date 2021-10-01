import MarkdownIt from 'markdown-it';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { FileService } from 'laerte_fernandes-sdk';

// faz o botão de underline sumir, pois não há conveção sobre sublinhado no markdown
MdEditor.unuse(Plugins.FontUnderline)

const parser = new MarkdownIt()

// code snippet retirado do google para fazer o componente de MarkDown abrir o conteudo de
// links digitados no texto em uma nova aba

const defaultRender = parser.renderer.rules.link_open ||
  function(tokens: any, idx: any, options: any, env: any, self: any) {
    return self.renderToken(tokens, idx, options);
  };

parser.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  var aIndex = tokens[idx].attrIndex('target');
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']);
  } else {
    //@ts-ignore
    tokens[idx].attrs[aIndex][1] = '_blank';
  }
  return defaultRender(tokens, idx, options, env, self);
};

// fim do snippet

export interface MarkdownEditorProps{
  onChange?: (text: string) => any
  value?: string;
  readOnly?: boolean;
}

export default function MarkdownEditor (props: MarkdownEditorProps) {

  async function handleImageUpload(file: File){
    return FileService.upload(file) 
  }

  return <MdEditor 
    readOnly={props.readOnly}
    onImageUpload={handleImageUpload}
    style={{ height: props.readOnly ? 'auto' : 300 }}
    value={props.value}
    renderHTML={text => parser.render(text)}
    // faz com que a prévia de visualização do markdown não seja exibida dividindo a tela
    config={{
      view: {
        html: false
      }
    }}
    onChange={({ text}) => props.onChange && props.onChange(text)}
    view={props.readOnly ? {
      menu: false,
      md: false,
      html: true
    }: undefined}
  />
}