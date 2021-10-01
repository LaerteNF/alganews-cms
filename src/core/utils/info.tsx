import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Info from '../../app/components/Info/Info';

interface InfoProps {
  title: string
  description: string
}

export default function info (props: InfoProps) {
  // encapsulada dentro do setTimeout para se tornar uma Macrotask (executar por ultimo) pois após o onConfirm aonde esta função
  // é recebida como parametro existe um onClose que deve ser executado antes dessa função para fechar o modal anterior e depois este ser aberto
  setTimeout(() => {
    confirmAlert({
      overlayClassName: 'info-overlay',
      customUI: () => {
        return (
          <Info 
            title={props.title}
            description={props.description}
          />
        );
      }
    });
  }, 0)

}